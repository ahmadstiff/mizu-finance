import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchAssets = () => {
  return (
    <div className="ml-8 hidden md:block">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
        </div>
        <Input
          type="search"
          placeholder="Search assets..."
          className="w-[300px] pl-10 bg-white border border-gray-200 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          transition-all duration-200 ease-in-out
          hover:border-gray-300"
        />
      </div>
    </div>
  );
};

export default SearchAssets;
