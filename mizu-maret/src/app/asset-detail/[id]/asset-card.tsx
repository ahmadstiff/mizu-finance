import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";


function AssetCard() {
    return (
      <Card className="w-100 h-full bg-black text-white border-0 overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative w-100 aspect-square overflow-hidden">
            <Image
              src="/example1.jpg"
              alt="Zia Beverage Royalties"
              fill
              className="object-cover"
            />
          </div>
  
          <div className="bg-black text-white p-4 rounded-b-xl flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="bg-green-500 text-white px-2 py-1 text-sm rounded-md">
                Non Alcoholic
              </span>
              <span className="bg-white text-black px-2 py-1 text-sm rounded-md">
                Collectibles
              </span>
            </div>
            <div className="text-sm text-gray-400">Min. Asset Valuation</div>
            <div className="flex justify-between">
              <div className="text-xl font-bold">150.00 USDC</div>
              <Button className="bg-blue-700 hover:bg-blue-600 text-white text-sm">Buy Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  export default AssetCard;