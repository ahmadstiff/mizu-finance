import { mizuMarketplace } from "@/contstants/addresses";
import { mizuMarketplaceAbi } from "@/lib/Abis/mizuMarketplace";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

function useReedemNft() {
      const { data: txHash, isPending, writeContract } = useWriteContract();
    
      const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
          hash: txHash,
        });

    const handleReedemNft = async () => {
        await writeContract({
            abi: mizuMarketplaceAbi,
            address: mizuMarketplace,
            functionName: "redeemERC721",
            args: [nftAddress, tokenId, subId],
        })
    };

    return {data, writeContract, isPending, handleReedemNft};
}
export default useReedemNft;