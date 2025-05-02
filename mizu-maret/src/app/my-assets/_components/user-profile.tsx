"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useAccount } from "wagmi";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserProfile = () => {
  const { address } = useAccount();
  console.log(address);
  return (
    <div className="max-w-full flex justify-between items-center">
      <Card className="rounded-2xl bg-white shadow-md border border-gray-100">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Connected Wallet</span>
            <span className="text-base font-semibold text-gray-800 break-all">
              {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
            </span>
          </div>
        </CardContent>
      </Card>
      <Link href="/addnft">
        <Button>Add NFT</Button>
      </Link>
    </div>
  );
};

export default UserProfile;
