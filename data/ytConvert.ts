"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { mutateData } from "../lib/mutate-data";

type ConversionResponse = {
  success?: boolean;
  data?: any;
  videoDetails?: {
    name: string;
  };
};

export async function convertVideo(videoUrl: string) {
  const session = await auth();

  if (!session?.strapiToken) {
    return { error: "Unauthorized: Please log in" };
  }

  const payload = {
    data: { url: videoUrl },
  };

  try {
    const response = await mutateData<ConversionResponse>(
      "POST",
      "/convert-video",
      payload,
    );

    if (response.error) {
      return { error: response.error };
    }

    if (response.data) {
      // Revalidate the page if needed
      // revalidatePath("/dashboard/missions");
      return { data: response.data };
    }

    return { error: "No data received from server" };
  } catch (error) {
    console.error("Video conversion failed:", error);
    return {
      error: error instanceof Error ? error.message : "Video conversion failed",
    };
  }
}
