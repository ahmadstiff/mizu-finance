"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";

type ThumbnailUploaderProps = {
  uploading: boolean;
  thumbnail: string;
  dropzone: ReturnType<typeof useDropzone>;
};

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  uploading,
  thumbnail,
  dropzone,
}) => {
  return (
    <div className="grid gap-2">
      <Label>Upload Thumbnail</Label>
      <div
        {...dropzone.getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 cursor-pointer ${
          dropzone.isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
        }`}
      >
        <input {...dropzone.getInputProps()} />
        <div className="flex flex-col items-center text-center">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-gray-500" />
              <p className="text-sm text-gray-500">
                Drag &amp; drop or click to upload
              </p>
            </>
          )}
        </div>
      </div>
      {thumbnail && (
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="mt-2 h-32 w-32 object-cover rounded-md border"
        />
      )}
    </div>
  );
};

export default ThumbnailUploader;
