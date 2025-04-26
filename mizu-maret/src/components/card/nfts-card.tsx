import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const NftsCard = () => {
  return (
    <Card className="mx-4 mt-4 w-60 rounded-3xl h-70 bg-black text-white border-0 overflow-hidden">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative w-60 aspect-square overflow-hidden">
          <Image
            src="https://ipfs.io/ipfs/QmYgZMvg7q4wBqe3gyQKEA2Nzf78MTjKFbQYg1pamHr22K"
            alt="Zia Beverage Royalties"
            fill
            className="object-cover cursor-pointer"
          />
        </div>

        <div className="bg-black text-white p-4 rounded-b-xl flex flex-col gap-2">
          <div className="text-sm text-gray-400">Min. Asset Valuation</div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">150.00 USDC</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NftsCard;
