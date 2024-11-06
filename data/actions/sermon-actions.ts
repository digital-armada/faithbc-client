"use server";
import { auth } from "@/auth";
import { mutateData } from "../../lib/mutate-data";
import { revalidatePath } from "next/cache";

export async function updateSermon(payload) {
  const dataToUpdate = {
    name: payload.name,
    date: payload.date,
    service_type: payload.service_type,
    slug: payload.slug,
    youtube: payload.youtube,
    verse: payload.verse,
    description: payload.description,
    youtubeId: payload.youtubeId,
    imageUrl: payload.imageUrl,
    speaker: payload.speaker ? parseInt(payload.speaker) : null,
    series: payload.series ? parseInt(payload.series) : null,
    audio: payload.audio || null,
  };

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("PUT", `/sermons/${payload.id}`, {
      data: dataToUpdate,
    });

    if (response.data) {
      revalidatePath("/dashboard/sermon-manager/sermons");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }
    return { error: "Unexpected response from server" };
  } catch (error) {
    return { error: error.message || "An error occurred" };
  }
}

export async function updateSermonAudio(sermonId, audioId) {
  const dataToUpdate = {
    audio: {
      connect: [audioId],
    },
  };

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("PUT", `/api/sermons/${sermonId}`, {
      data: dataToUpdate,
    });

    if (response.data) {
      revalidatePath("/dashboard/sermon-manager/sermons");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }
    return { error: "Unexpected response from server" };
  } catch (error) {
    return { error: error.message || "An error occurred" };
  }
}
