import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AssetCardProps } from "@/types/type";
import Image from "next/image";

function AssetCard({ asset }: AssetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);


  return (
    <Card className="w-100 h-full bg-black text-white border-0 overflow-hidden">
      <CardContent
        className="p-0 flex flex-col h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-100 aspect-square overflow-hidden">
          <Image
            src={asset.imageUrl}
            alt={asset.title}
            className="object-cover transition-all duration-300"
            fill
          />
        </div>

        <div className="bg-black text-white p-4 rounded-b-xl flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="bg-green-500 text-white px-2 py-1 text-sm rounded-md">
              {asset.category || "Category"}
            </span>
            <span className="bg-white text-black px-2 py-1 text-sm rounded-md">
              {asset.status || "Status"}
            </span>
          </div>
          <div className="text-sm text-gray-400">Min. Asset Valuation</div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">
              {asset.price} {asset.currency}
            </div>
            <Button className="bg-blue-700 hover:bg-blue-600 text-white text-sm">
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AssetCard;
