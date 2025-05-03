"use client";

import { useNftsData } from "@/hooks/useNftsData";
import { useParams } from "next/navigation";

function AssetDetail() {
  const { assets, loading, error } = useNftsData();
  const params = useParams();
  const id = params?.id;

  if (loading) {
    return <div>Loading asset...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const asset = assets.find((a) => a.id.toString() === id);

  if (!asset) {
    return <div>Asset not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{asset.title}</h1>
      <img
        src={asset.imageUrl}
        alt={asset.title}
        className="w-full max-w-md rounded-lg mb-4"
      />
      <p className="text-lg mb-2">
        Price: {asset.price} {asset.currency}
      </p>
      <p className="text-gray-700">{asset.description}</p>
    </div>
  );
}

export default AssetDetail;
