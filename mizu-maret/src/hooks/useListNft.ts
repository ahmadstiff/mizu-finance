import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mizuMarketplaceAbi } from "@/lib/Abis/mizuMarketplace";
import { mizuMarketplace } from "@/contstants/addresses";

export function useListNft() {
  const { data: txHash, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const listNft = async ({
    tokenId,
    subId,
    fragments,
    priceUnit,
    minPurchase,
    paymentToken,
  }: {
    tokenId: bigint;
    subId: bigint;
    fragments: bigint;
    priceUnit: bigint;
    minPurchase: bigint;
    paymentToken: `0x${string}`;
  }) => {
    const DECIMALS = BigInt(10 ** 8);
    const formattedPriceUnit = priceUnit * DECIMALS;
    const formattedMinPurchase = minPurchase * DECIMALS;
    await writeContract({
      abi: mizuMarketplaceAbi,
      address: mizuMarketplace,
      functionName: "listERC6960",
      args: [
        tokenId,
        subId,
        fragments,
        formattedPriceUnit,
        formattedMinPurchase,
        paymentToken,
      ],
    });
  };

  return {
    listNft,
    txHash,
    isPending,
    isConfirming,
    isConfirmed,
  };
}
