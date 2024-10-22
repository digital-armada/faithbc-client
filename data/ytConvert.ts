"use server";
import { auth } from "@/auth";
import { mutateData } from "./services/mutate-data";

export async function convertVideo(videoUrl) {
  const session = await auth();
  console.log("hit", session?.strapiToken);

  if (!session?.strapiToken) {
    throw new Error("Unauthorized");
  }

  const payload = { data: { url: videoUrl } };

  try {
    const response = mutateData("POST", "/youtube-url", payload);
    console.log("response", response);
    if (response.data) {
      // revalidatePath("/dashboard/missions");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in Conver:", error);

    if (error instanceof Error) {
      // Check if 'error' is an instance of Error and has a 'message' property
      return { error: error.message || "An error occurred" };
    } else {
      // Handle case where error might not be an instance of Error
      return { error: "An unexpected error occurred" };
    }
  }
}
