"use server";

import {
  imageSchema,
  audioSchema,
} from "@/src/interface-adapters/validation-schemas/media-validation";
import { MediaUploadResult } from "@/types/media";
import { fileUploadService } from "@/data/services/file-service";

export async function uploadMediaAction(
  formData: FormData,
  type: "image" | "audio",
): Promise<MediaUploadResult> {
  const file = formData.get("files");

  // Validate based on media type
  const schema = type === "image" ? imageSchema : audioSchema;
  const validatedFields = schema.safeParse({ file });

  if (!validatedFields.success) {
    return {
      data: null,
      error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      message: `Invalid ${type} file`,
    };
  }

  try {
    const fileUploadResponse = await fileUploadService(file as File);
    const uploadedFile = fileUploadResponse[0];

    console.log("uploadedFile", uploadedFile);

    return {
      data: {
        id: uploadedFile.id,
        url: uploadedFile.url,
      },
      error: null,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
    };
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
      message: `Failed to upload ${type}`,
    };
  }
}
