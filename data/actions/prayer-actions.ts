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
      "/api/missionaries/1?populate=*",
    );

    if (!existingData.data) {
      throw new Error("Failed to fetch existing data");
    }

    // Append the new item to the existing array
    const newPrayerItem = {
      name,
      request,
    };

    const updatedPrayerItems = [
      ...existingData.data.attributes.prayerrequests,
      newPrayerItem,
    ];

    const payload = {
      data: {
        prayerrequests: updatedPrayerItems,
      },
    };
    console.log(payload);
    // Update the data with the modified array
    const response = await mutateData("PUT", "/api/missionaries/1", payload);

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

export async function deletePrayerRequest(id: number) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const existingData = await mutateData(
      "GET",
      "/api/missionaries/1?populate=*",
    );
    if (!existingData.data) {
      throw new Error("Failed to fetch existing data");
    }

    const updatedPrayerItems =
      existingData.data.attributes.prayerrequests.filter(
        (item: any) => item.id !== id,
        // (item: any) => item.id !== id.id,
      );

    const payload = {
      data: {
        prayerrequests: updatedPrayerItems,
      },
    };
    const response = await mutateData("PUT", "/api/missionaries/1", payload);

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
