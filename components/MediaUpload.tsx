"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { uploadMediaAction } from "@/data/actions/file-actions";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";

interface MediaUploadProps {
  type: "image" | "audio";
  onUploadComplete: (data: { id: number; url: string }) => void;
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
  const baseUrl = getStrapiURL();

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
        <div className="relative aspect-video w-full max-w-[200px]">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="rounded-md object-cover"
          />
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
