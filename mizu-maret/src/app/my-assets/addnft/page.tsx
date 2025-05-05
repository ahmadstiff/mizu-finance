import NftForm from "@/components/form/NftForm";
import React from "react";

const AddNfts = () => {
  return (
    <div className="bg-white rounded-md shadow p-6 sm:max-w-xl mx-auto">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Sell NFT</h1>
        <p className="text-sm text-gray-500">
          Enter the details of the NFT you wish to sell on the marketplace.
        </p>
      </header>
      <NftForm />
    </div>
  );
};

export default AddNfts;
