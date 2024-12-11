"use server";

import { auth } from "@/auth";
import { strapiRequest } from "@/lib/strapi-service";
import { revalidatePath } from "next/cache";

export async function updateMember({ id, blocked }) {
  console.log("updateMember", id, blocked);
  try {
    const response = await strapiRequest("PUT", `/users/${id}`, {
      data: {
        blocked,
      },

      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/contacts");
      return { success: response.success };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in updateUserCommGroup:", error);
    return { error: error.message || "An error occurred" };
  }
}

export async function checkMemberStatus() {
  const result = await strapiRequest("PUT", "/users", {
    requireAuth: true,
    data: {
      filters: {
        blocked: true,
        updates: { commGroup: 3 },
      },
    },
  });
  console.log(result);
  return result;
}
