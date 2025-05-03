"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useNftsData } from "@/hooks/useNftsData";
import Image from "next/image";
import Link from "next/link";

const NftsCard = () => {
  const { assets, loading, error } = useNftsData();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-start mt-4 max-w-4xl mx-auto">
      {assets.map((asset) => (
        <Card
          key={asset.id}
          className="w-60 rounded-sm h-70 bg-black text-white border-0 overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredId(asset.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative w-60 aspect-square overflow-hidden">
              <Image
                src={hoveredId === asset.id ? asset.imageUrl : asset.thumbnail}
                alt={asset.title}
                className="object-cover w-full h-full transition-all duration-300  rounded-sm"
                fill
              />
            </div>
            <Link href={`/asset-detail/${asset.id}`}>
              <div className="bg-black text-white p-4 rounded-b-xl flex flex-col gap-2">
                <div className="text-sm text-gray-400">
                  Min. Asset Valuation
                </div>
                <div className="flex justify-between">
                  <div className="text-xl font-bold">
                    {asset.price} {asset.currency}
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NftsCard;
