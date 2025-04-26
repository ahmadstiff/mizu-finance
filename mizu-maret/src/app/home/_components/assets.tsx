import NftsCard from "@/components/card/nfts-card";
import React from "react";

const Assets = () => {
  return (
    <>
      <div>
        <div className="mx-4 flex gap-2 flex-col">
          <span>Find RWA assets</span>
          <span>Search by categories</span>
          <div>assets</div>
        </div>
        <NftsCard />
      </div>
    </>
  );
};

export default Assets;
