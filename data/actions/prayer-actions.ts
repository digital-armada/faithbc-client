"use server";

import { auth } from "@/auth";
import { mutateData } from "@/lib/mutate-data";
import { revalidatePath } from "next/cache";

export async function createNewChurchPrayerRequest(formData: FormData) {
  const name = formData.get("name");
  const request = formData.get("request");

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const missionary = await mutateData("GET", "/missionaries/1?populate=*");

    if (!missionary.data || typeof missionary.data !== "object") {
      throw new Error("Invalid missionary data");
    }

    const existingPrayerRequests =
      (missionary.data as any).data?.attributes?.prayerrequests || [];

    const newPrayerRequest = {
      _component: "prayerrequests.component",
      name,
      request,
    };

    const updatedPrayerRequests = [...existingPrayerRequests, newPrayerRequest];

    const payload = {
      data: {
        prayerrequests: updatedPrayerRequests,
      },
    };

    console.log("payload", payload);
    // Update the data with the modified array
    const response = await mutateData("PUT", "/missionaries/1", payload);

    if (response.data) {
      revalidatePath("/dashboard/prayer-requests");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in Prayer request:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
export async function deletePrayerRequest(id: { id: number }) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const existingData = await mutateData("GET", "/missionaries/1?populate=*");

    if (!existingData || !("data" in existingData)) {
      throw new Error("Failed to fetch existing data");
    }

    const updatedPrayerItems = (
      existingData.data as any
    ).data.attributes.prayerrequests.filter((item: any) => item.id !== id.id);
    console.log("Filtered prayer items:", updatedPrayerItems);

    const payload = {
      data: {
        prayerrequests: updatedPrayerItems,
      },
    };
    const response = await mutateData("PUT", "/missionaries/1", payload);
    console.log("Update response:", response);

    if (response && "data" in response) {
      console.log("Successfully updated prayer requests");
      revalidatePath("/dashboard/prayer-requests");
      return { data: response.data };
    } else if (response && "error" in response) {
      console.log("Error in response:", response.error);
      return { error: response.error || "An error occurred" };
    }

    console.log("Unexpected response format");
    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in Prayer request:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
