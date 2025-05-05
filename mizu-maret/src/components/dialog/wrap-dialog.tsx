"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useWrapERC721 from "@/hooks/useWrapNft";
import { ReactNode } from "react";

interface WrapAssetDialogProps {
  trigger: ReactNode;
}

export default function WrapAssetDialog({ trigger }: WrapAssetDialogProps) {
  const [tokenId, setTokenId] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const [fragments, setFragments] = useState("");

  const {
    handleApproveNft,
    isApprovePending,
    isApproving,
    isApproved,
    isWrapping,
    isWrapped,
  } = useWrapERC721();

  const handleWrap = async () => {
    await handleApproveNft({
      tokenId: BigInt(tokenId),
      nftAddress: nftAddress as `0x${string}`,
      fragments: BigInt(fragments),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">

        <div className="bg-white">
          <div className="flex flex-col items-center p-6">
            <Image
              src="/your-image-path.png"
              alt="Asset"
              width={200}
              height={300}
              className="rounded-md object-contain"
            />
            <DialogTitle className="mt-4 text-lg font-semibold text-gray-900">
              Taylor Swift Album
            </DialogTitle>
          </div>

          <div className="border-t p-4 space-y-3 text-sm text-gray-600">
            <div>
              <Label htmlFor="tokenId">Token ID</Label>
              <Input
                id="tokenId"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="nftAddress">NFT Address</Label>
              <Input
                id="nftAddress"
                value={nftAddress}
                onChange={(e) => setNftAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fragments">Fragments</Label>
              <Input
                id="fragments"
                value={fragments}
                onChange={(e) => setFragments(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={handleWrap}
              disabled={isApprovePending || isApproving || isWrapping}
            >
              {isWrapping
                ? "Wrapping..."
                : isApproving
                ? "Approving..."
                : "Wrap into ERC-6960"}
            </Button>

            {isWrapped && (
              <p className="text-sm text-green-600 mt-2">
                ✅ Asset successfully wrapped!
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
