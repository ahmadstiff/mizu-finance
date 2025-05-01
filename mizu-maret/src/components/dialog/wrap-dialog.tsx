"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface WrapAssetDialogProps {
  trigger: ReactNode;
}

export default function WrapAssetDialog({ trigger }: WrapAssetDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
        <div className="bg-white">
          <div className="flex flex-col items-center p-6">
            <Image
              src="/your-image-path.png"
              alt="Asset"
              width={200}
              height={300}
              className="rounded-md object-contain"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Wrap Asset
            </h2>
          </div>

          <div className="border-t p-4 text-sm text-gray-600">
            <div className="mb-2">
              <span className="block font-medium text-gray-500">
                Asset Name
              </span>
              <span className="text-gray-900">
                1992 X-Men Series I #XH-2 Cable - Hologram (CGC 7 NM)
              </span>
            </div>
            <div className="mb-2">
              <span className="block font-medium text-gray-500">Standard</span>
              <span className="text-gray-900">ERC721</span>
            </div>
            <div className="mb-4">
              <span className="block font-medium text-gray-500">Network</span>
              <span className="text-gray-900">Polygon</span>
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Wrap into ERC-6960
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
