"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
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
import { NftFormData } from "@/types/type";
import ThumbnailUploader from "@/components/thumbnail-uploader";

// Initial form data
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
  currency: "ETH",
  category: "Art",
  status: "LISTED",
};

export default function NftForm() {
  const [formData, setFormData] = useState<NftFormData>(initialFormData);
  const [uploading, setUploading] = useState<boolean>(false);

  // Handle changes in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for Select components
  const handleSelectChange = (name: keyof NftFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "z6euuqyl");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dv3z889zh/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      if (result.secure_url) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: result.secure_url,
        }));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload thumbnail. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Dropzone callback
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadToCloudinary(acceptedFiles[0]);
    }
  }, []);

  // Setup dropzone
  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      alert("Please upload a thumbnail first.");
      return;
    }

    try {
      const res = await fetch("https://mizu-backend-one.vercel.app/api/nfts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch((jsonErr) => {
        console.error("Failed to parse JSON from response:", jsonErr);
        return null;
      });

      if (!res.ok) {
        console.error("Server responded with an error:", {
          status: res.status,
          statusText: res.statusText,
          body: data,
        });
        const errorMessage = data?.message || "Failed to send data to server.";
        throw new Error(errorMessage);
      }

      console.log("Success response:", data);
      alert("NFT added successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Submission caught error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Unknown error occurred during submission.";

      alert(`Submission failed: ${message}`);
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
        onChange={handleChange}
        required
        placeholder="Owner Wallet Address"
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
          <SelectValue placeholder="Select Tags" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="art">Art</SelectItem>
          <SelectItem value="music">Music</SelectItem>
          <SelectItem value="collectible">Collectible</SelectItem>
        </SelectContent>
      </Select>

      {/* Thumbnail upload component */}
      <ThumbnailUploader
        uploading={uploading}
        thumbnail={formData.thumbnail}
        dropzone={dropzone}
      />

      <Input
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="IPFS URL for Image (optional)"
        required
      />

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
            <SelectValue placeholder="Select Currency" />
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
          <SelectItem value="Art">Art</SelectItem>
          <SelectItem value="Music">Music</SelectItem>
          <SelectItem value="Collectibles">Collectibles</SelectItem>
          <SelectItem value="Games">Games</SelectItem>
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
          <SelectItem value="LISTED">LISTED</SelectItem>
          <SelectItem value="SOLD">SOLD</SelectItem>
          <SelectItem value="PENDING">PENDING</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="mt-4">
        Save NFT
      </Button>
    </form>
  );
}
