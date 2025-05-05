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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <Card
              key={index}
              className="rounded-lg h-[380px] text-white border border-gray-200 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <Skeleton className="w-full h-64 bg-gray-200" /> {/* Image */}
                <div className="bg-white p-4 flex flex-col gap-2">
                  <Skeleton className="h-6 w-3/4 bg-gray-200" /> {/* Title */}
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-5 w-1/3 bg-gray-200" /> {/* Price */}
                    <Skeleton className="h-5 w-1/4 bg-gray-200" />{" "}
                    {/* Category */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="container mx-auto px-4 py-6 text-red-500 text-center">
        Error loading NFTs: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {assets.slice(0, 5).map((asset) => (
          <Link
            href={`/asset-detail/${asset.id}`}
            key={asset.id}
            className="block"
          >
            <Card
              className="rounded-lg h-[380px] bg-white text-white border border-gray-200 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredId(asset.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={
                      hoveredId === asset.id ? asset.imageUrl : asset.thumbnail
                    }
                    alt={asset.title}
                    className="object-cover w-full h-full transition-all duration-500 ease-in-out "
                    width={300}
                    height={300}
                  />
                </div>
                <div className="bg-white text-gray-800 p-4 flex flex-col gap-2 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {asset.title}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-lg font-medium text-gray-900">
                      {asset.price} {asset.currency}
                    </div>
                    <div className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {asset.category}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NftsCard;
