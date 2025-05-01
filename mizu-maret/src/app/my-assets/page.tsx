import React from "react";
import UserProfile from "./_components/user-profile";
import AssetTable from "@/components/table/wrap-table";
import MarketTable from "@/components/table/market-table";
import HistorTable from "@/components/table/history-table";

const Page = () => {
  return (
    <div className="flex flex-col mx-12 gap-4">
      <UserProfile />
      <AssetTable />
      <MarketTable />
      <HistorTable />
    </div>
  );
};

export default Page;
