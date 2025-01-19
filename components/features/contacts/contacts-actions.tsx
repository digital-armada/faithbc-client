"use server";

import { auth } from "@/lib/auth";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";
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
      return { success: true, data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in updateUserCommGroup:", error);
    return { success: false, message: error || "An error occurred" };
  }
}

export async function checkMemberStatus() {
  try {
    // Step 1: Fetch blocked users
    const blockedUsers = await strapiRequest("GET", "/users", {
      requireAuth: true,
      query: {
        filters: {
          blocked: true,
        },
      },
    });

    // Step 2: Update each blocked user

    const { data: returnedBlockedUsers } = blockedUsers;

    for (const user of returnedBlockedUsers) {
      await strapiRequest("PUT", `/users/${user.id}`, {
        requireAuth: true,
        data: {
          commgroups: [1, 3],
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error in checkMemberStatus:", error);
    return { success: false, message: error || "An error occurred" };
  }
}

export async function addMembersToComm() {
  try {
    // Step 1: Fetch blocked users
    const members = await strapiRequest("GET", "/users", {
      requireAuth: true,
      query: {
        filters: {
          blocked: false,
        },
      },
    });

    // Step 2: Update each blocked user

    const { data: returnedMembers } = members;

    for (const user of returnedMembers) {
      await strapiRequest("PUT", `/users/${user.id}`, {
        requireAuth: true,
        data: {
          commgroups: [1, 2],
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error in checkMemberStatus:", error);
    return { success: false, message: error || "An error occurred" };
  }
}
