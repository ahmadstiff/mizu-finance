"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AssetCard from "./asset-card";
import InfoCard from "./info-card";
import BuyDialog from "@/components/dialog/buy-dialog";
import Link from "next/link";

export default function AssetDetailPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      <div className="w-full lg:w-1/3">
        <AssetCard />
      </div>
      <div className="w-full lg:w-2/3 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <span className="text-sm text-gray-700">Lamp</span>
          <span className="text-sm text-gray-700">icon</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard label="Asset Category" value="Collectibles" />
          <InfoCard label="Token ID" value="10" copyable />
          <InfoCard label="Protocol" value="Polytrade x Zia" hasLink />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard label="Sector" value="Non Alcoholic Beverages" />
          <InfoCard label="Underlying" value="Soda" />
          <InfoCard label="Contract Address" value="0x1167...85f6" copyable />
        </div>
        <TagsCard />
        <div className="flex justify-end gap-4">
          <BuyDialog
            triggerButton={
              <Button className="bg-blue-700 hover:bg-blue-600 text-white">
                Buy Now
              </Button>
            }
          />
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Add To Cart
          </Button>
          <Link href="/addnft">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Sell
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TagsCard() {
  const tags = [
    "Non Alcoholic Beverage",
    "Root Beer",
    "Cola",
    "Ginger Ale",
    "Sandia",
    "Nopales",
    "natural craft soda line",
    "Beverage",
    "NFT",
  ];

  return (
    <Card className="bg-gray-50 border border-gray-100">
      <CardContent className="p-4">
        <div className="text-gray-500 text-sm mb-3">Tags</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-700 rounded-full px-3 py-1 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
