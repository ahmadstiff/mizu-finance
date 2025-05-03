"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useNftsData } from "@/hooks/useNftsData";
import Image from "next/image";
import Link from "next/link";

const NftsCard = () => {
  const { assets, loading, error } = useNftsData();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-4 justify-start mt-4 max-w-full mx-4">
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="w-[300px] rounded-sm h-[340px] text-white border-2 border-gray-200 overflow-hidden shadow-lg"
          >
            <CardContent className="p-0 flex flex-col h-full">
              <Skeleton className="w-full h-64 bg-gray-300" /> {/* Image */}
              <div className="bg-white p-4 flex flex-col gap-2">
                <Skeleton className="h-6 w-3/4 bg-gray-400" /> {/* Title */}
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3 bg-gray-400" /> {/* Price */}
                  <Skeleton className="h-5 w-1/4 bg-gray-400" /> {/* Category */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-start mt-4 max-w-full mx-4">
      {assets.map((asset) => (
        <Card
          key={asset.id}
          className="w-[300px] rounded-sm h-[380px] bg-white text-white border-2 border-gray-200 overflow-hidden shadow-lg"
          onMouseEnter={() => setHoveredId(asset.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <CardContent className="p-0 flex flex-col flex-1">
            <div className="relative w-full flex items-center justify-center overflow-hidden mx-auto">
              <Image
                src={hoveredId === asset.id ? asset.imageUrl : asset.thumbnail}
                alt={asset.title}
                className="object-contain w-full h-64 rounded-sm transition-all duration-300"
                width={256}
                height={256}
              />
            </div>
            <Link href={`/asset-detail/${asset.id}`}>
              <div className="bg-white text-gray-800 mt-4 p-4 rounded-b-sm flex flex-col gap-2 cursor-pointer ">
                <div className="text-xl text-gray-700 font-semibold">
                  {asset.title}
                </div>
                <div className="flex justify-between">
                  <div className="text-lg font-medium">
                    {asset.price} {asset.currency}
                  </div>
                  <div className="text-md text-gray-600">
                    {asset.category}
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