"use server";

import { auth } from "@/auth";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";

export async function createNewChurchPrayerRequest(formData: FormData) {
  const name = formData.get("name");
  const request = formData.get("request");

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    // Fetch the existing data
    const existingData = await mutateData(
      "GET",
      "/api/prayeritems/1?populate=*",
    );
    console.log(existingData);
    if (!existingData.data) {
      throw new Error("Failed to fetch existing data");
    }

    // Append the new item to the existing array
    const newPrayerItem = {
      name,
      request,
    };

    const updatedPrayerItems = [
      ...existingData.data.attributes.prayeritem,
      newPrayerItem,
    ];

    const payload = {
      data: {
        prayeritem: updatedPrayerItems,
      },
    };
    console.log(payload);
    // Update the data with the modified array
    const response = await mutateData("PUT", "/api/prayeritems/1", payload);

    if (response.data) {
      revalidatePath("/dashboard/prayer-requests");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in Prayer request:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
