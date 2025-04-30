// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IDLT {
    event Transfer(
        address indexed sender, address indexed recipient, uint256 indexed mainId, uint256 subId, uint256 amount
    );
    event TransferBatch(
        address indexed sender, address indexed recipient, uint256[] mainIds, uint256[] subIds, uint256[] amounts
    );
    event Approval(address indexed owner, address indexed operator, uint256 mainId, uint256 subId, uint256 amount);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event URI(string oldValue, string newValue, uint256 indexed mainId);

    function setApprovalForAll(address operator, bool approved) external;

    function safeTransferFrom(
        address sender,
        address recipient,
        uint256 mainId,
        uint256 subId,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);

    function approve(address operator, uint256 mainId, uint256 subId, uint256 amount) external returns (bool);

    function subBalanceOf(address account, uint256 mainId, uint256 subId) external view returns (uint256);

    function balanceOfBatch(address[] calldata accounts, uint256[] calldata mainIds, uint256[] calldata subIds)
        external
        view
        returns (uint256[] calldata);

    function allowance(address owner, address operator, uint256 mainId, uint256 subId)
        external
        view
        returns (uint256);

    function isApprovedForAll(address owner, address operator) external view returns (bool);

    function mint(address to, uint256 mainId, uint256 subId, uint256 amount) external;
}

interface IDLTReceiver {
    function onDLTReceived(
        address operator,
        address from,
        uint256 mainId,
        uint256 subId,
        uint256 amount,
        bytes calldata data
    ) external returns (bytes4);

    function onDLTBatchReceived(
        address operator,
        address from,
        uint256[] calldata mainIds,
        uint256[] calldata subIds,
        uint256[] calldata amounts,
        bytes calldata data
    ) external returns (bytes4);
}

contract MizuMarketplace is Ownable {
    // Events
    event NFTWrapped(address indexed nftContract, uint256 indexed tokenId, address indexed owner, uint256 fragments);

    event NFTRedeemed(address indexed nftContract, uint256 indexed tokenId, uint256 indexed subId, address indexed redeemer);

    event FragmentsListed(
        uint256 indexed listingId,
        address indexed seller,
        uint256 indexed mainId,
        uint256 subId,
        uint256 amount,
        uint256 pricePerUnit,
        uint256 minPurchaseAmount,
        address paymentTokenAddress
    );

    event FragmentsPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        uint256 mainId,
        uint256 subId,
        uint256 amount,
        uint256 totalPrice
    );

    event ListingCancelled(uint256 indexed listingId, address indexed seller);

    event OfferCreated(
        uint256 indexed listingId,
        uint256 indexed offerId,
        address indexed buyer,
        uint256 amount,
        uint256 pricePerUnit,
        uint256 expirationTime
    );

    event OfferAccepted(
        uint256 indexed listingId,
        uint256 indexed offerId,
        address indexed seller,
        address buyer,
        uint256 amount,
        uint256 totalPrice
    );

    event OfferCancelled(uint256 indexed listingId, uint256 indexed offerId, address indexed buyer);

    // Errors
    error AmountExceedsListing();
    error BelowMinimumPurchaseAmount();
    error FragmentTransferFailed();
    error InsufficientListedAmount();
    error InsufficientListingAmount();
    error InvalidAmount();
    error InvalidDuration();
    error InvalidFragmentsAmount();
    error InvalidListing();
    error InvalidMinPurchaseAmount();
    error InvalidOffer();
    error InvalidPricePerUnit();
    error NotBuyer();
    error NotFullOwner();
    error NotSeller();
    error NotWrapped();
    error OfferExpired();
    error TransferFailed();
    error TokenTransferFailed();

    struct ERC6960Listing {
        address seller;
        uint256 mainId;
        uint256 subId;
        uint256 amount;
        uint256 pricePerUnit;
        uint256 minPurchaseAmount;
        address paymentToken;
        bool active;
    }

    struct WrappedNFT {
        address nftContract;
        uint256 tokenId;
        uint256 totalFragments;
        bool isWrapped;
    }

    struct Offer {
        address buyer;
        uint256 listingId;
        uint256 amount;
        uint256 pricePerUnit;
        uint256 expirationTime;
        bool active;
    }

    IDLT public dlt;
    IERC20 public immutable usdc;
    mapping(uint256 => ERC6960Listing) public erc6960Listings;
    uint256 public erc6960Count;
    mapping(address => WrappedNFT) public wrappedNFTs;
    mapping(address => uint256) public userSubIdCounter;

    // Offer mappings
    mapping(uint256 => Offer) public offers;
    uint256 public offerCount;
    mapping(uint256 => uint256[]) public listingOffers; // listingId => offerIds

    constructor(address _dltAddress, address _usdcAddress) Ownable(msg.sender) {
        dlt = IDLT(_dltAddress);
        usdc = IERC20(_usdcAddress);
    }

    function wrapERC721(address nft, uint256 tokenId, uint256 fragments) external {
        if (fragments <= 0) revert InvalidFragmentsAmount();
        IERC721(nft).transferFrom(msg.sender, address(this), tokenId);

        wrappedNFTs[nft] = // wrappedNFTs[tokenId]
            WrappedNFT({nftContract: nft, tokenId: tokenId, totalFragments: fragments, isWrapped: true});

        dlt.mint(msg.sender, tokenId, userSubIdCounter[msg.sender], fragments);
        userSubIdCounter[msg.sender]++;

        emit NFTWrapped(nft, tokenId, msg.sender, fragments);
    }

    function redeemERC721(address _nft, uint256 _subId) external {
        WrappedNFT storage nft = wrappedNFTs[_nft];
        if (!nft.isWrapped) revert NotWrapped();
        if (dlt.subBalanceOf(msg.sender, tokenId, _subId) != nft.totalFragments) revert NotFullOwner();

        dlt.safeTransferFrom(msg.sender, address(this), tokenId, _subId, nft.totalFragments, "");

        IERC721(nft.nftContract).transferFrom(address(this), msg.sender, tokenId);

        nft.isWrapped = false;

        emit NFTRedeemed(nft.nftContract, tokenId, subId, msg.sender);
    }

    function listERC6960(uint256 mainId, uint256 subId, uint256 amount, uint256 pricePerUnit, uint256 minPurchaseAmount, address paymentTokenAddress)
        external
        returns (uint256)
    {
        if (amount <= 0) revert InvalidAmount();
        if (pricePerUnit <= 0) revert InvalidPricePerUnit();
        if (minPurchaseAmount <= 0) revert InvalidMinPurchaseAmount();

        if (!dlt.safeTransferFrom(msg.sender, address(this), mainId, subId, amount, "")) revert TransferFailed();

        erc6960Listings[listingId] = ERC6960Listing({
            seller: msg.sender,
            mainId: mainId,
            subId: subId,
            amount: amount,
            pricePerUnit: pricePerUnit,
            minPurchaseAmount: minPurchaseAmount,
            paymentToken: paymentTokenAddress, // usdc enum
            active: true
        });

        uint256 listingId = erc6960Count++;

        emit FragmentsListed(listingId, msg.sender, mainId, subId, amount, pricePerUnit, minPurchaseAmount, paymentTokenAddress);

        return listingId;
    }

    function buyERC6960(uint256 listingId, uint256 amount) external {
        ERC6960Listing storage listing = erc6960Listings[listingId];
        if (!listing.active) revert InvalidListing();
        if (amount <= 0) revert InvalidAmount();
        if (amount > listing.amount) revert InsufficientListedAmount();

        uint256 totalPrice = amount * listing.pricePerUnit;
        if (totalPrice < listing.minPurchaseAmount) revert BelowMinimumPurchaseAmount();

        // Transfer USDC from buyer to seller
        if (!(listing.paymentToken).transferFrom(msg.sender, listing.seller, totalPrice)) revert TokenTransferFailed();

        // Transfer fragments to buyer
        if (!dlt.safeTransferFrom(address(this), msg.sender, listing.mainId, listing.subId, amount, "")) {
            revert FragmentTransferFailed();
        }

        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        emit FragmentsPurchased(
            listingId, msg.sender, listing.seller, listing.mainId, listing.subId, amount, totalPrice
        );
    }

    function cancelListing(uint256 listingId) external {
        ERC6960Listing storage listing = erc6960Listings[listingId];
        if (!listing.active) revert InvalidListing();
        if (listing.seller != msg.sender) revert NotSeller();

        listing.active = false;

        emit ListingCancelled(listingId, msg.sender);
    }

    function makeOffer(uint256 listingId, uint256 amount, uint256 pricePerUnit, uint256 duration) external {
        if (amount <= 0) revert InvalidAmount();
        if (pricePerUnit <= 0) revert InvalidPricePerUnit();
        if (duration <= 0) revert InvalidDuration();

        ERC6960Listing storage listing = erc6960Listings[listingId];
        if (!listing.active) revert InvalidListing();
        if (amount > listing.amount) revert AmountExceedsListing();

        uint256 totalPrice = amount * pricePerUnit;
        if (!(listing.paymentToken).transferFrom(msg.sender, address(this), totalPrice)) revert TokenTransferFailed();
        
        uint256 offerId = offerCount++;
        
        offers[offerId] = Offer({
            buyer: msg.sender,
            listingId: listingId,
            amount: amount,
            pricePerUnit: pricePerUnit,
            expirationTime: block.timestamp + duration,
            active: true
        });

        listingOffers[listingId].push(offerId);

        emit OfferCreated(listingId, offerId, msg.sender, amount, pricePerUnit, block.timestamp + duration);
    }

    function acceptOffer(uint256 offerId) external {
        Offer storage offer = offers[offerId];
        if (!offer.active) revert InvalidOffer();
        if (block.timestamp > offer.expirationTime) revert OfferExpired();

        ERC6960Listing storage listing = erc6960Listings[offer.listingId];
        if (msg.sender != listing.seller) revert NotSeller();
        if (offer.amount > listing.amount) revert InsufficientListingAmount();

        uint256 totalPrice = offer.amount * offer.pricePerUnit;

        // Transfer USDC from contract to seller
        if (!(listing.paymentToken).transfer(msg.sender, totalPrice)) revert TokenTransferFailed();

        // Transfer fragments to buyer
        if (!dlt.safeTransferFrom(address(this), offer.buyer, listing.mainId, listing.subId, offer.amount, "")) {
            revert FragmentTransferFailed();
        }

        listing.amount -= offer.amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        offer.active = false;

        emit OfferAccepted(offer.listingId, offerId, msg.sender, offer.buyer, offer.amount, totalPrice);
    }

    function cancelOffer(uint256 offerId) external {
        Offer storage offer = offers[offerId];
        if (!offer.active) revert InvalidOffer();
        if (msg.sender != offer.buyer) revert NotBuyer();

        uint256 totalPrice = offer.amount * offer.pricePerUnit;

        // Refund USDC to buyer
        if (!usdc.transfer(offer.buyer, totalPrice)) revert TokenTransferFailed();

        offer.active = false;

        emit OfferCancelled(offer.listingId, offerId, offer.buyer);
    }

    function getListingOffers(uint256 listingId) external view returns (uint256[] memory) {
        return listingOffers[listingId];
    }

    // function to get active offers for a listing
    function getActiveOffers(uint256 listingId) external view returns (uint256[] memory) {
        uint256[] memory allOffers = listingOffers[listingId];
        uint256[] memory activeOfferIds = new uint256[](allOffers.length);
        uint256 activeCount = 0;

        for (uint256 i = 0; i < allOffers.length; i++) {
            uint256 offerId = allOffers[i];
            Offer storage offer = offers[offerId];
            if (offer.active && block.timestamp <= offer.expirationTime) {
                activeOfferIds[activeCount] = offerId;
                activeCount++;
            }
        }

        // Resize array to actual number of active offers
        uint256[] memory result = new uint256[](activeCount);
        for (uint256 i = 0; i < activeCount; i++) {
            result[i] = activeOfferIds[i];
        }

        return result;
    }
}
