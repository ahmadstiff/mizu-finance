import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchAssets = () => {
  return (
    <div className="ml-8 hidden md:block">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search"
          className="w-[300px] pl-10 bg-gray-50 border border-gray-200"
        />
      </div>
    </div>
  );
};

export default SearchAssets;
