import NftsCard from "@/components/card/nfts-card";
import React from "react";

const RecommendationAssets = () => {
  return (
    <div>
      <div className="mx-4 flex justify-between">
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-2xl">Find RWA assets</span>
          <span className="text-sm text-gray-800">Search by categories</span>
        </div>
        <div>
          <span>View All</span>
        </div>
      </div>
      <NftsCard />
    </div>
  );
};

export default RecommendationAssets;
