"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import useBuyNft from "@/hooks/useBuyNft";

const BuyDialog = ({ triggerButton }: { triggerButton?: React.ReactNode }) => {
  const { buyNft, isApproving, isBuying, isBought } = useBuyNft();

  const [amount, setAmount] = useState("");
  const [listingId, setListingId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    await buyNft({ amount: Number(amount), listingId: BigInt(listingId) });
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Buy NFT</DialogTitle>
          <DialogDescription>
            Masukkan jumlah dan ID listing NFT untuk dibeli.
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src="https://ipfs.io/ipfs/QmYgZMvg7q4wBqe3gyQKEA2Nzf78MTjKFbQYg1pamHr22K"
            alt="Zia Beverage Royalties"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-4 space-y-2">
          <Input
            type="number"
            placeholder="Listing ID (e.g. 1)"
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount (e.g. 0.15)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          className="mt-4 w-full bg-blue-700 hover:bg-blue-600 text-white"
          onClick={handleBuy}
          disabled={loading || isApproving || isBuying}
        >
          {isApproving
            ? "Approving..."
            : isBuying
            ? "Buying..."
            : isBought
            ? "Purchased!"
            : "Buy Now"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
