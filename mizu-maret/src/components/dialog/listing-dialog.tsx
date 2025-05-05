"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useListNft } from "@/hooks/useListNft";

export default function ListingAssetDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [tokenId, setTokenId] = useState("");
  const [subId, setSubId] = useState("");
  const [fragments, setFragments] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [paymentToken, setPaymentToken] = useState("");

  const { listNft, txHash, isPending, isConfirming, isConfirmed } =
    useListNft();

  const handleList = async () => {
    await listNft({
      tokenId: BigInt(tokenId),
      subId: BigInt(subId),
      fragments: BigInt(fragments),
      priceUnit: BigInt(priceUnit),
      minPurchase: BigInt(minPurchase),
      paymentToken: paymentToken as `0x${string}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Listing Your Asset</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="tokenId">Token ID</Label>
            <Input
              id="tokenId"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subId">Sub ID</Label>
            <Input
              id="subId"
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fragments">Fragments</Label>
            <Input
              id="fragments"
              value={fragments}
              onChange={(e) => setFragments(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priceUnit">Price Unit (in wei)</Label>
            <Input
              id="priceUnit"
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minPurchase">Min Purchase</Label>
            <Input
              id="minPurchase"
              value={minPurchase}
              onChange={(e) => setMinPurchase(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="paymentToken">Payment Token</Label>
            <Input
              id="paymentToken"
              value={paymentToken}
              onChange={(e) => setPaymentToken(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleList} disabled={isPending || isConfirming}>
            {isPending || isConfirming ? "Processing..." : "Listing"}
          </Button>
        </DialogFooter>

        {isConfirmed && (
          <p className="text-sm text-green-600 mt-2">
            ✅ Transaction successful: {txHash?.slice(0, 10)}...
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
