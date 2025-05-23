import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mizuMarketplace,property } from "@/constants/addresses";
import { mizuMarketplaceAbi } from "@/lib/Abis/mizuMarketplace";
import { propertyAbi } from "@/lib/Abis/property";

export default function useWrapERC721() {
  const {
    data: approveHash,
    isPending: isApprovePending,
    writeContract: approveNft,
  } = useWriteContract();

  const {
    data: wrapHash,
    isPending: isWrapPending,
    writeContract: wrapNft,
  } = useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isWrapping, isSuccess: isWrapped } =
    useWaitForTransactionReceipt({ hash: wrapHash });

  const handleApproveNft = async ({
    tokenId,
    nftAddress,
    fragments,
  }: {
    tokenId: bigint;
    nftAddress: `0x${string}`;
    fragments: bigint;
  }) => {
    await approveNft({
      abi: propertyAbi,
      address: property,
      functionName: "approve",
      args: [mizuMarketplace, tokenId],
    });

    await wrapNft({
      abi: mizuMarketplaceAbi,
      address: mizuMarketplace,
      functionName: "wrapERC721",
      args: [nftAddress, tokenId, fragments],
    });
  };

  return {
    handleApproveNft,
    isApprovePending,
    isApproving,
    isApproved,
    isWrapping,
    isWrapped,
  };
}
