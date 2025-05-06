import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mizuMarketplace, mockUsdc } from "@/constants/addresses";
import { mizuMarketplaceAbi } from "@/lib/Abis/mizuMarketplace";
import { mockErc20Abi } from "@/lib/Abis/mockErc20Abi";

function useBuyNft() {
  const {
    data: approveHash,
    isPending: isApprovePending,
    writeContract: approveNft,
  } = useWriteContract();

  const {
    data: buyHash,
    isPending: isBuyPending,
    writeContract: buyNftTx,
  } = useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isBuying, isSuccess: isBought } =
    useWaitForTransactionReceipt({ hash: buyHash });

  const buyNft = async ({
    amount,
    listingId,
  }: {
    amount: number;
    listingId: bigint;
  }) => {
    const parseAmount = BigInt(amount * 10 ** 10); // assumed USDC has 6 decimals

    // Approve
    await approveNft({
      abi: mockErc20Abi,
      address: mockUsdc,
      functionName: "approve",
      args: [mizuMarketplace, parseAmount],
    });

    // Buy NFT
    await buyNftTx({
      abi: mizuMarketplaceAbi,
      address: mizuMarketplace,
      functionName: "buyERC6960",
      args: [listingId, BigInt(amount)],
    });
  };

  return {
    buyNft,
    isApproving,
    isApproved,
    isBuying,
    isBought,
    isApprovePending,
    isBuyPending,
  };
}

export default useBuyNft;
