import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mizuMarketplace } from "@/constants/addresses";
import { mizuMarketplaceAbi } from "@/lib/Abis/mizuMarketplace";

type ListNftParams = {
  tokenId: bigint;
  collectionId: bigint;
  price: bigint;
  fragments: bigint;
  royaltyPercentage: bigint;
  royaltyReceiver: `0x${string}`;
};

function useListNft() {
  const {
    data: listHash,
    isPending: isListPending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isListing, isSuccess: isListed } =
    useWaitForTransactionReceipt({ hash: listHash });

  const handleListNft = async ({
    tokenId,
    collectionId,
    price,
    fragments,
    royaltyPercentage,
    royaltyReceiver,
  }: ListNftParams) => {
    return await writeContract({
      abi: mizuMarketplaceAbi,
      address: mizuMarketplace,
      functionName: "listERC6960",
      args: [
        tokenId,
        collectionId,
        fragments,
        price,
        royaltyPercentage,
        royaltyReceiver,
      ],
    });
  };

  return {
    handleListNft,
    txHash: listHash,
    isPending: isListPending,
    isListing,
    isListed,
  };
}

export default useListNft;
