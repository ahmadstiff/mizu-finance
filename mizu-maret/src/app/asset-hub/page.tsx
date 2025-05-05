"use client";

import { useState, useMemo } from "react";
import { CategoryIcons, type Category } from "@/components/CategoryIcons";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import type { NFT } from "@/types/nft";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';


type SortOption = "newest" | "oldest" | "price-high" | "price-low";

async function fetchNFTs(category: Category | null = null) {
  try {
    const response = await fetch(
      `https://mizu-backend-one.vercel.app/api/nfts${category ? `?category=${category.toLowerCase()}` : ""
      }`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch NFTs");
    }
    const data = await response.json();
    return data as NFT[];
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
}

export default function AssetsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const {
    data: nfts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nfts", selectedCategory],
    queryFn: () => fetchNFTs(selectedCategory),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  const filteredAndSortedNFTs = useMemo(() => {
    let result = [...nfts];

    if (selectedCategory) {
      result = result.filter(
        (nft) => nft.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (nft) =>
          nft.title.toLowerCase().includes(query) ||
          nft.description.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        default:
          return 0;
      }
    });

    return result;
  }, [nfts, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-[85vw]">
        <h1 className="text-3xl font-bold mb-6">Find your next RWA asset</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
            <Input
              type="search"
              placeholder="Search RWA assets as per categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 w-full rounded-lg border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
            />
          </div>
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px] py-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
              <SelectItem
                value="newest"
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                Newest First
              </SelectItem>
              <SelectItem
                value="oldest"
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                Oldest First
              </SelectItem>
              <SelectItem
                value="price-high"
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                Price: High to Low
              </SelectItem>
              <SelectItem
                value="price-low"
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                Price: Low to High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CategoryIcons
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading NFTs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p className="text-lg font-semibold">Error loading NFTs</p>
            <p className="text-sm mt-2">Please try again later</p>
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 ">
                  <TableHead className="w-[150px] py-4 text-lg">Asset</TableHead>
                  <TableHead className="text-lg">Title</TableHead>
                  <TableHead className="text-lg">Category</TableHead>
                  <TableHead className="text-lg">Price</TableHead>
                  <TableHead className="text-lg">Status</TableHead>
                  <TableHead className="text-lg">Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedNFTs.map((nft) => (
                  <TableRow
                    key={nft.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/asset-detail/${nft.id}`)}
                  >
                    <TableCell>
                      <div className="relative w-24 h-24">
                        <Image
                          src={nft.thumbnail || nft.imageUrl}
                          alt={nft.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-base font-medium text-gray-600">
                      {nft.title}
                    </TableCell>
                    <TableCell className="text-base">{nft.category}</TableCell>
                    <TableCell className="font-medium text-base">{`${nft.price} ${nft.currency}`}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1.5 rounded-full text-sm ${nft.status === 'LISTED' ? 'bg-green-100 text-green-800' :
                        nft.status === 'UNLISTED' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {nft.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {nft.tags?.split(',').map((tag, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
            {filteredAndSortedNFTs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg font-semibold">No NFTs found</p>
                <p className="text-sm mt-2">
                  {selectedCategory
                    ? `No NFTs available in the ${selectedCategory} category`
                    : "Try adjusting your search or filters"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
