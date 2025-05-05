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
import { ArrowLeft, ArrowRight, Copy, Plus } from "lucide-react";
import { useAccount } from "wagmi";
import WrapAssetDialog from "../dialog/wrap-dialog";

export default function AssetTable() {
  const { address } = useAccount();
  const asset = {
    name: "Burj Khalifa Card",
    standard: "ERC721",
    protocol: "MizuCol",
    network: "Pharos",
    wallet: address,
  };

  const shorten = (val: string) => `${val.slice(0, 6)}...${val.slice(-4)}`;

  return (
    <Card className="p-6 rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
        <span className="text-blue-500">ℹ️</span>
        <span className="text-gray-900 text-xl font-semibold">
          Available to Wrap: 1
        </span>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Name</TableHead>
            <TableHead>Standard</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Network</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>{asset.name}</TableCell>
            <TableCell>{asset.standard}</TableCell>
            <TableCell>{asset.protocol}</TableCell>
            <TableCell>{asset.network}</TableCell>
            <TableCell>{shorten(String(asset.wallet))}</TableCell>
            <TableCell className="flex justify-center">
              <WrapAssetDialog
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="mx-auto flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Wrap
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
