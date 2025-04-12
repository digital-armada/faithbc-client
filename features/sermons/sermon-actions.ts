"use server";
import { revalidatePath } from "next/cache";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";
import slugify from "slugify";

interface StrapiError {
  message: string;
  details?: {
    message?: string;
    [key: string]: any;
  };
}

interface ActionResponse {
  success: boolean;
  data?: any;
  error?: StrapiError;
}

export async function createSermonFromVideo(video) {
  const baseSlug = slugify(video.title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let slugExists = true;
  let slugCounter = 1;

  while (slugExists) {
    const checkResponse = await strapiRequest(
      "GET",
      `/sermons?filters[slug][$eq]=${uniqueSlug}`,
    );
    if (checkResponse.data.data.length === 0) {
      slugExists = false;
    } else {
      uniqueSlug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }
  }

  const thumbnailUrl = video.thumbnailUrl.url.replace(
    "hqdefault.jpg",
    "maxresdefault.jpg",
  );

  const sermonData = {
    data: {
      name: video.title,
      date: new Date(video.publishTime).toISOString(),
      slug: uniqueSlug,
      youtubeId: video.id,
      youtube: `https://www.youtube.com/watch?v=${video.id}`,
      description: video.description || "",
      imageUrl: thumbnailUrl,
    },
  };

  const response = await strapiRequest("POST", "/sermons", {
    data: sermonData,
    requireAuth: true,
  });

  revalidatePath("/dashboard/sermon-manager/youtube");
  revalidatePath("/sermons");

  return response;
}

export async function updateSermon(payload): Promise<ActionResponse> {
  const dataToUpdate = {
    data: {
      id: payload.id,
      name: payload.name,
      date: payload.date,
      service_type: payload.service_type,
      slug: payload.slug,
      youtube: payload.youtube,
      verse: payload.verse,
      description: payload.description,
      youtubeId: payload.youtubeId,
      imageUrl: payload.imageUrl,
      speaker: payload.speaker ? { id: payload.speaker } : null,
      series: payload.series ? parseInt(payload.series) : null,
      audio: payload.audio ? { id: payload.audio } : null,
    },
  };
  console.log("dataToUpdate", payload);

  try {
    const response = await strapiRequest("PUT", `/sermons/${payload.id}`, {
      data: dataToUpdate,
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/sermon-manager/");
      revalidatePath(`/dashboard/sermon-manager/${payload.id}`);
      revalidatePath(`/sermons`);
      return { success: true, data: response.data };
    }

    return {
      success: false,
      error: {
        message: response.error?.message || "An error occurred",
        details: response.error?.details,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      success: false,
      error: { message: errorMessage },
    };
  }
}

export async function updateSermonAudio(sermonId, audioId) {
  const dataToUpdate = {
    audio: {
      connect: [audioId],
    },
  };

  try {
    const response = await strapiRequest("PUT", `/api/sermons/${sermonId}`, {
      data: dataToUpdate,
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/sermon-manager/sermons");
      return { success: true, data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }
    return { error: "Unexpected response from server" };
  } catch (error) {
    return { success: false, message: error || "An error occurred" };
  }
}
