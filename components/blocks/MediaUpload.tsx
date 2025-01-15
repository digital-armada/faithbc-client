"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { uploadMediaAction } from "@/data/actions/file-actions";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

interface MediaUploadProps {
  type: "image" | "audio";
  onUploadComplete: (
    data: { id: number | null; url: string | null } | null,
  ) => void;
  preview?: string;
  accept?: string;
}

export function MediaUpload({
  type,
  onUploadComplete,
  preview,
  accept,
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(preview);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      // Create preview for images
      if (type === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      const formData = new FormData();
      formData.append("files", file);

      const result = await uploadMediaAction(formData, type);

      console.log("result", result);

      if (result.data) {
        onUploadComplete(result.data);
        if (type === "image") {
          setPreviewUrl(`${result.data.url}`);
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = (e) => {
    e.preventDefault;
    setPreviewUrl(null);
    onUploadComplete({ id: null, url: null });
  };

  return (
    <div className="space-y-4">
      <Input
        name="media"
        type="file"
        onChange={handleFileChange}
        accept={accept || (type === "image" ? "image/*" : "audio/*")}
        disabled={isUploading}
        className="cursor-pointer"
      />

      {isUploading && <div className="text-sm text-blue-600">Uploading...</div>}

      {error && <div className="text-sm text-red-600">{error}</div>}
      {type === "image" && previewUrl && (
        <div className="relative">
          <button
            className="absolute z-10 rounded-full bg-gray-800/20 p-1 text-white"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative aspect-video w-full max-w-[200px]">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>
      )}

      {type === "audio" && previewUrl && (
        <audio controls src={previewUrl} className="w-full max-w-[300px]" />
      )}
    </div>
  );
}

// Usage Example:
/*
// For images:
To use this in your application:

Basic Image Upload:

tsxCopy<MediaUpload
  type="image"
  onUploadComplete={(data) => {
    form.setValue('imageId', data.id);
    form.setValue('imageUrl', data.url);
  }}
/>

Basic Audio Upload:

tsxCopy<MediaUpload
  type="audio"
  onUploadComplete={(data) => {
    form.setValue('audioId', data.id);
    form.setValue('audioUrl', data.url);
  }}
/>

With Custom Accept Types:

tsxCopy<MediaUpload
  type="image"
  accept="image/jpeg,image/png"
  onUploadComplete={handleUploadComplete}
  preview={existingImageUrl}
/>
*/
