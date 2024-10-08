"use server";
import { auth } from "@/auth";
import { mutateData } from "../services/mutate-data";
import { revalidatePath } from "next/cache";

export async function updateSermon(payload) {
  // Prepare data for update
  const dataToUpdate = {
    ...payload,
    speaker: payload.speaker ? { id: payload.speaker.id } : null,
    series: payload.series ? { id: payload.series.id } : null,
  };

  console.log("updateSermon payload:", dataToUpdate);

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData(
      "PUT",
      `/api/sermons/${dataToUpdate.id}`,
      {
        data: dataToUpdate,
      },
    );

    // Check if response contains data or error
    if (response.data) {
      revalidatePath("/dashboard/sermon-manager/sermons");
      return { data: response.data };
    } else if (response.error) {
      console.error("Error from server:", response.error);
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in updateSermon:", error);
    return { error: error.message || "An error occurred" };
  }
}
