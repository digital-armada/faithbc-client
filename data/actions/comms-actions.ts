"use server";

import { auth } from "@/auth";
import { mutateData } from "@/lib/mutate-data";
import { revalidatePath } from "next/cache";

export async function createNewCommGroup(prevState: any, formData: FormData) {
  try {
    const groupName = formData.get("list");

    const payload = {
      data: {
        groupName,
      },
    };

    const response = await mutateData("POST", "/commgroups", payload);

    if (response.data) {
      revalidatePath("/dashboard/contacts/comms");
      // Return a plain object
      return { data: JSON.parse(JSON.stringify(response.data)) };
    }

    if (response.error) {
      return { error: response.error.toString() };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in createNewCommGroup:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
export async function updateUserCommGroup(user, group) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("PUT", `/commgroups/${group}`, {
      data: {
        users: {
          set: user,
        },
      },
    });

    if (response.data) {
      revalidatePath("/dashboard/contacts/comms");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in updateUserCommGroup:", error);
    return { error: error.message || "An error occurred" };
  }
}

export async function deleteUserCommGroup(payload) {
  try {
    const userId = payload.userId;
    const groupId = payload.groupId;

    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("PUT", `/commgroups/${groupId}`, {
      data: {
        users: {
          disconnect: [userId],
        },
      },
    });
    if (response.data) {
      revalidatePath("/dashboard/contacts/comms");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteUserCommGroup:", error);
    return { error: error.message || "An error occurred" };
  }
}
export async function deleteCommGroup(groupId) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("DELETE", `/commgroups/${groupId}`);

    if (response.data) {
      revalidatePath("/dashboard/contacts/comms");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteCommGroup:", error);
    return { error: error.message || "An error occurred" };
  }
}
