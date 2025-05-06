import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NftsCard from "@/components/card/nfts-card";
const RecommendationAssets = () => {
  return (
    <div>
      <div className="mx-4 flex justify-between">
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-xl my-4">Find Best RWA Assets</span>
        </div>
        <Link href="/asset-hub">
          <Button className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-300 transition">
            <span>View All </span>
          </Button>
        </Link>
      </div>
     <NftsCard />
    </div>
  );
};

export default RecommendationAssets;
