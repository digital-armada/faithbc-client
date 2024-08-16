"use server";
import { z } from "zod";
import { fileUploadService } from "../services/file-service";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// VALIDATE IMAGE WITH ZOD
const imageSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file.size !== 0 && file.name !== undefined,
      "Please update or add new image.",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function uploadImageAction(formData: FormData) {
  console.log("FormData received in uploadImageAction:", formData);

  // VALIDATE THE IMAGE
  const file = formData.get("files");
  const validatedFields = imageSchema.safeParse({
    image: file,
  });

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Image",
    };
  }
  console.log("Validated file:", file);

  // UPLOAD NEW IMAGE TO MEDIA LIBRARY
  try {
    const fileUploadResponse = await fileUploadService(file);
    const updatedImageId = fileUploadResponse[0].id;
    const imageUrl = fileUploadResponse[0].url;
    const payload = { image: updatedImageId, url: imageUrl };

    if (!fileUploadResponse || fileUploadResponse.error) {
      return {
        data: null,
        error: fileUploadResponse?.error || "Failed to upload file.",
        message: "Ops! Something went wrong. Please try again.",
      };
    }

    console.log("payload file:", fileUploadResponse);
    return {
      data: payload,
      error: null,
      message: "Image Uploaded",
    };
  } catch (error) {
    console.error("Error in file upload service:", error);
    return {
      data: null,
      error: "Error uploading image.",
      message: "Failed to upload image.",
    };
  }
}
