"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useListNft from "@/hooks/useListNft";
import { useAccount, useConnect } from "wagmi";

export default function ListingAssetDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [tokenId, setTokenId] = useState("");
  const [subId, setSubId] = useState("");
  const [fragments, setFragments] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [paymentToken, setPaymentToken] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const {
    handleListNft,
    txHash: listHash,
    isPending: isListPending,
    isListing,
    isListed,
  } = useListNft();

  const handleList = async () => {
    try {
      setErrorMessage(null);

      if (!isConnected || !address) {
        setErrorMessage("Please connect your wallet to list an NFT.");
        return;
      }

      // Validate inputs
      if (
        !tokenId ||
        !subId ||
        !fragments ||
        !priceUnit ||
        !minPurchase ||
        !paymentToken
      ) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }

      const DECIMALS = BigInt(10 ** 6);
      await handleListNft({
        tokenId: BigInt(tokenId),
        collectionId: BigInt(subId),
        price: BigInt(priceUnit) * DECIMALS,
        fragments: BigInt(fragments),
        royaltyPercentage: BigInt(minPurchase), // default? bisa disesuaikan
        royaltyReceiver: address,
      });
    } catch (error) {
      console.error("Listing failed:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  // Connect wallet function
  const handleConnectWallet = () => {
    if (connectors[0]) {
      connect({ connector: connectors[0] });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Listing Your Asset</DialogTitle>
          <DialogDescription>
            Enter the details to list your NFT on the marketplace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="tokenId">Token ID</Label>
            <Input
              id="tokenId"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subId">Sub ID</Label>
            <Input
              id="subId"
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fragments">Fragments</Label>
            <Input
              id="fragments"
              value={fragments}
              onChange={(e) => setFragments(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priceUnit">Price Unit</Label>
            <Input
              id="priceUnit"
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
              placeholder="Enter price (will be multiplied by 10^6)"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minPurchase">Min Purchase</Label>
            <Input
              id="minPurchase"
              value={minPurchase}
              onChange={(e) => setMinPurchase(e.target.value)}
              placeholder="Enter minimum purchase amount"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="paymentToken">Payment Token</Label>
            <Input
              id="paymentToken"
              value={paymentToken}
              onChange={(e) => setPaymentToken(e.target.value)}
              placeholder="0x..."
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {!isConnected ? (
            <Button onClick={handleConnectWallet} className="w-full">
              Connect Wallet
            </Button>
          ) : (
            <Button
              onClick={handleList}
              disabled={isListPending || isListed}
              className="w-full"
            >
              {isListPending || isListing ? "Processing..." : "List NFT"}
            </Button>
          )}
        </DialogFooter>

        {errorMessage && (
          <p className="text-sm text-red-600 mt-2">Error: {errorMessage}</p>
        )}

        {isListing && (
          <p className="text-sm text-green-600 mt-2">
            ✅ Transaction successful: {isListing}...
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
