"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary } from "@/lib/data/upload-thumbnail";
import { postNftData } from "@/lib/data/post-nft";
import { NftFormData } from "@/types/type";
import ThumbnailUploader from "@/components/thumbnail-uploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount } from "wagmi";

const initialFormData: NftFormData = {
  title: "",
  description: "",
  owner: "",
  nftId: "",
  nftAddress: "",
  tags: "",
  thumbnail: "",
  imageUrl: "",
  price: "",
  currency: "USDC",
  category: "",
  status: "AVAILABLE",
};

export default function NftForm() {
  const [formData, setFormData] = useState<NftFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageOption, setImageOption] = useState<"url" | "upload">("url");
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setFormData((prev) => ({ ...prev, owner: address }));
    }
  }, [address]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof NftFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(acceptedFiles[0], "nft-thumbnails");
      setFormData((prev) => ({ ...prev, thumbnail: url }));
    } catch (err) {
      alert("Upload thumbnail failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      alert("Please upload a thumbnail first.");
      return;
    }

    if (!formData.imageUrl) {
      alert("Please provide or upload an image.");
      return;
    }

    try {
      await postNftData(formData);
      alert("NFT added successfully!");
      setFormData(initialFormData);
    } catch (error) {
      alert(
        `Submission failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="NFT Title"
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Description"
      />
      <Input
        name="owner"
        value={formData.owner}
        placeholder="Owner Wallet Address"
        readOnly
        hidden
        disabled
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="nftId"
          value={formData.nftId}
          onChange={handleChange}
          required
          placeholder="NFT ID"
        />
        <Input
          name="nftAddress"
          value={formData.nftAddress}
          onChange={handleChange}
          required
          placeholder="NFT Address"
        />
      </div>
      <Select
        value={formData.tags}
        onValueChange={(v) => handleSelectChange("tags", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Tags" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Real Estate">Real Estate</SelectItem>
          <SelectItem value="Picture">Picture</SelectItem>
          <SelectItem value="Yield">Yield</SelectItem>
          <SelectItem value="Music Yield">Music Yield</SelectItem>
          <SelectItem value="Digital Assets">Digital Assets</SelectItem>
          <SelectItem value="Property">Property</SelectItem>
          <SelectItem value="Luxury Property">Luxury Property</SelectItem>
          <SelectItem value="Artist Revenue">Artist Revenue</SelectItem>
          <SelectItem value="Stock Dividend">Stock Dividend</SelectItem>
        </SelectContent>
      </Select>

      <ThumbnailUploader
        uploading={uploading}
        thumbnail={formData.thumbnail}
        dropzone={dropzone}
      />

      {/* --- Image input via IPFS URL or Cloudinary Upload --- */}
      <div className="space-y-2">
        <div className="flex gap-4 items-center">
          <label>
            <input
              type="radio"
              value="url"
              checked={imageOption === "url"}
              onChange={() => setImageOption("url")}
            />
            <span className="ml-2">Use IPFS URL</span>
          </label>
          <label>
            <input
              type="radio"
              value="upload"
              checked={imageOption === "upload"}
              onChange={() => setImageOption("upload")}
            />
            <span className="ml-2">Upload to Cloudinary</span>
          </label>
        </div>

        {imageOption === "url" ? (
          <Input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="Image URL (e.g., IPFS)"
          />
        ) : (
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadingImage(true);
                try {
                  const url = await uploadToCloudinary(file, "nft-images");
                  setFormData((prev) => ({ ...prev, imageUrl: url }));
                } catch (err) {
                  alert("Cloudinary upload failed");
                } finally {
                  setUploadingImage(false);
                }
              }}
            />
            {uploadingImage && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Uploaded preview"
                className="mt-2 w-32"
              />
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Price"
        />
        <Select
          value={formData.currency}
          onValueChange={(v) => handleSelectChange("currency", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ETH">ETH</SelectItem>
            <SelectItem value="USDC">USDC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Select
        value={formData.category}
        onValueChange={(v) => handleSelectChange("category", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Royality">Royality</SelectItem>
          <SelectItem value="Real Estate">Real Estate</SelectItem>
          <SelectItem value="Collectible">Collectible</SelectItem>
          <SelectItem value="Membership">Membership</SelectItem>
          <SelectItem value="Comodity">Comodity</SelectItem>
          <SelectItem value="Credit">Credit</SelectItem>
          <SelectItem value="Stocks">Stocks</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={formData.status}
        onValueChange={(v) => handleSelectChange("status", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AVAILABLE">Available</SelectItem>
          <SelectItem value="UNLISTED">Unlisted</SelectItem>
          <SelectItem value="LISTED">Listed</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="mt-4">
        Save NFT
      </Button>
    </form>
  );
}
