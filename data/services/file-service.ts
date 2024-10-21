"use server";
import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

type Metadata = {
  name?: string;
  // Add other fields as necessary
};

export async function fileUploadService(image: any) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);
  const session = await auth();

  const formData = new FormData();

  // Ensure 'file' is a valid Readable Stream or path
  if (typeof file === "string") {
    try {
      await fs.promises.access(file, fs.constants.F_OK);
    } catch {
      throw new Error(`File does not exist: ${file}`);
    }
    file = fs.createReadStream(file);
  }

  formData.append("files", file, {
    filename: metadata.name || path.basename(file.path || "untitled.mp3"),
    contentType: "audio/mpeg",
  });

  // Append additional metadata fields
  Object.entries(metadata).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${session?.strapiToken}` },
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    console.log("Response status:", response.status);
    console.log("Response data:", dataResponse);

    if (!response.ok) {
      throw new Error(dataResponse.message || "Failed to upload image");
    }

    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
