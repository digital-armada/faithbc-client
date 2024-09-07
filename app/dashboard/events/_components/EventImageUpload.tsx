"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { uploadImageAction } from "@/data/actions/file-actions";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";

interface EventImageUploadProps {
  onImageUploaded: (imageId: string) => void;
  preview?: string;
}

export function EventImageUpload({
  onImageUploaded,
  preview,
}: EventImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(preview);
  const baseUrl = getStrapiURL();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

      console.log("FormData before upload:", formData);

      const result = await uploadImageAction(formData);

      console.log("Upload result:", result);

      if (result.data) {
        onImageUploaded(result.data.image);
        // Update preview URL with the uploaded image URL
        setPreviewUrl(`${baseUrl}${result.data.url}`);
      } else if (result.error) {
        throw new Error(result.error);
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Input
        name="image"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        disabled={isUploading}
      />
      {isUploading && <p>Uploading...</p>}
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}
