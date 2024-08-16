import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";

export async function fileUploadService(image: any) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);
  const session = await auth();

  const formData = new FormData();
  formData.append("files", image, image.name);

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
