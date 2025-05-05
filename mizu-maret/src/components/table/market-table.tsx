"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useAccount } from "wagmi";
import ListingAssetDialog from "../dialog/listing-dialog";

export default function MarketTable() {
  const { address } = useAccount();
  const asset = {
    name: "1992 X-Men Series I #XH-2 Cable - Hologram (CGC 7 NM)",
    standard: "ERC721",
    protocol: "Courtyard",
    network: "Polygon",
    wallet: address,
    fraction:"100",
    fractionAmount:"100",
    status:"Listed",
  };

  const shorten = (val: string) => `${val.slice(0, 6)}...${val.slice(-4)}`;

  return (
    <Card className="p-6 rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
        <span className="text-blue-500">ℹ️</span>
        <span className="text-gray-900 text-xl font-semibold">Available on Markertplace: 0</span>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Name</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Asset Valuation</TableHead>
            <TableHead>fraction %</TableHead>
            <TableHead>Fraction Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>

            <TableCell>{asset.name}</TableCell>
            <TableCell>{asset.protocol}</TableCell>
            <TableCell>{asset.fraction}</TableCell>
            <TableCell>{asset.fractionAmount}</TableCell>
            <TableCell>{asset.status}</TableCell>
            <TableCell>{shorten(String(asset.wallet))}</TableCell>
            <TableCell className="flex justify-center">
              <ListingAssetDialog
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="mx-auto flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    List
                  </Button>
                }
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <Button variant="outline" size="icon" className="rounded-full" disabled>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-xs">Page 1 of 1</span>
        <Button variant="outline" size="icon" className="rounded-full" disabled>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
