"use server";

import { auth } from "@/auth";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";

export async function createNewMissions(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const location = formData.get("location");

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const payload = { data: { name, location } };
    // console.log(payload);
    const response = await mutateData("POST", "/api/missionaries", payload);

    if (response.data) {
      revalidatePath("/dashboard/missions");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in Missionary:", error);
    return { error: error.message || "An error occurred" };
  }
}
