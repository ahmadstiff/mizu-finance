import { assetItems } from "@/lib/data/asset-item";
import React from "react";

const ItemHeader = () => {
  return (
    <>
      <div className="mx-4 flex gap-1 flex-col">
        <span className="font-bold text-2xl">Find RWA assets</span>
        <span className="text-sm text-gray-800">Search by categories</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {assetItems.map((item) => (
          <div key={item.category} className="flex flex-col items-center">
            <img
              src={item.src}
              alt={item.name}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <span className="mt-2 text-sm text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemHeader;
