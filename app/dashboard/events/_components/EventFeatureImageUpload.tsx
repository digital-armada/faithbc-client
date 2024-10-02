"use client";
import React from "react";
import { uploadImageAction } from "@/data/actions/file-actions";
import { ImageUploadForm } from "@/components/ui/FormImage";

interface EventFeatureImageUploadProps {
  eventId: string | null;
  currentImageUrl: string | null;
  onImageUpload: (imageId: string) => void;
}

// Component to handle image upload for event feature image
export function EventFeatureImageUpload({
  eventId,
  currentImageUrl,
  onImageUpload,
}: EventFeatureImageUploadProps) {
  // Handle image selection and upload
  const handleImageSelect = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    // Upload the image
    const result = await uploadImageAction(formData);
    // console.log(

    // If upload is successful, notify parent component
    // if (result.data && result.data.featuredImage) {
    //   onImageUpload(result.data.featuredImage);
    // }
  };

  return (
    <div>fix</div>
    // <ImageUploadForm
    //   id="event-image"
    //   name="event-image"
    //   label="Event Feature Image"
    //   defaultValue={currentImageUrl ?? undefined}
    //   onImageSelect={handleImageSelect}
    // />
  );
}
