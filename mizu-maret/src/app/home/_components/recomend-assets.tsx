import NftsCard from "@/components/card/nfts-card";
import React from "react";
import Link from "next/link";

const RecommendationAssets = () => {
  return (
    <div>
      <div className="mx-4 flex justify-between">
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-3xl my-4">Find RWA assets</span>
        </div>
        <Link href="/asset-hub">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-300 transition">
            <span>View All </span>
          </button>
        </Link>
      </div>
      <NftsCard />
    </div>
  );
};

export default RecommendationAssets;
