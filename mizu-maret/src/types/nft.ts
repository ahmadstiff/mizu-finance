import { Category } from "@/components/CategoryIcons";

export interface NFT {
  tags: string;
  id: number;
  title: string;
  description: string;
  owner: string;
  nftId: string;
  nftAddress: string;
  thumbnail: string;
  imageUrl: string;
  price: string;
  currency: string;
  category: Category;
  status: "LISTED" | "SOLD_OUT" | "UNLISTED";
  createdAt: string;
  updatedAt: string;
}
