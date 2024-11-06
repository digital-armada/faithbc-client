"use server";

import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/auth";

interface UploadResponse {
  id: number;
  url: string;
  // add other expected properties from Strapi's response
}

export async function fileUploadService(image: any): Promise<UploadResponse[]> {
  const session = await auth();
  if (!session?.strapiToken) throw new Error("No auth token found");

  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);

  const formData = new FormData();
  formData.append("files", image);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${session.strapiToken}` },
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`,
      );
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
