import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BuyDialog = ({ triggerButton }: { triggerButton?: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Buy NFT</DialogTitle>
          <DialogDescription>
            Dapatkan hak royalti dari Zia Beverage NFT.
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

        <div className="mt-4 text-lg font-semibold text-center">
          Price: <span className="text-blue-600">0.15 ETH</span>
        </div>

        <Button className="mt-4 w-full bg-blue-700 hover:bg-blue-600 text-white">
          Buy Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
