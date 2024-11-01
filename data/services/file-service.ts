"use server";
import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

type Metadata = {
  name?: string;
};

export async function fileUploadService(file, metadata: Metadata = {}) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);
  const session = await auth();
  const formData = new FormData();

  try {
    // Handle file input and ensure it's a proper stream
    if (typeof file === "string") {
      try {
        await fs.promises.access(file, fs.constants.F_OK);
        file = fs.createReadStream(file);
      } catch (error) {
        console.error("File access error:", error);
        throw new Error(`File access error: ${error.message}`);
      }
    }

    // Ensure file is a proper stream
    if (!file.pipe || typeof file.pipe !== "function") {
      throw new Error("Invalid file format: Expected a readable stream");
    }

    const filename =
      metadata.name || (file.path ? path.basename(file.path) : "audio.mp3");

    console.log("Uploading file:", {
      filename,
      path: file.path,
      streamType: typeof file.pipe,
    });

    formData.append("files", file, {
      filename,
      contentType: "audio/mpeg",
    });

    const response = await axios.post(url.toString(), formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 0, // No timeout
    });

    console.log("Upload response:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("Upload error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
}
