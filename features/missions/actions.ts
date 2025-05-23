"use server";

import { auth } from "@/auth";
import createMissionaryService from "@/src/application/services/missionaryService";
import { CreateMissionaryDto } from "@/src/domain/dtos/MissionaryDto";
import { CreateMissionaryType } from "@/src/domain/entities/models/Missionary";
import { AuthService } from "@/src/infrastructure/services/authentication.service";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";
import { revalidatePath } from "next/cache";

type FormState = {
  data: any;
  error?: string | { message: string; details?: any } | undefined;
  success: boolean;
};

export async function createNewMissions(formData: CreateMissionaryType) {
  try {
    // Auth Check
    const session = await new AuthService().getSession();
    // TODO: throw an Unauthenticed Error here?
    if (!session?.strapiToken) throw new Error("No auth token found");

    // FORMAT - not needed

    // INPUT DTO
    const payload: CreateMissionaryDto = formData;

    // INVOKE USE CASE
    const { createMissionaryUseCase } = createMissionaryService();
    const result = await createMissionaryUseCase.execute(
      payload,
      session?.strapiToken,
    );

    revalidatePath("/dashboard/missions");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };

    console.error("Error in createNewMissionsAction:", error);
    // catch the Unauthenticed Error here and return it
  }
}

// export async function createNewMissions(
//   formData: FormData,
// ): Promise<FormState> {
//   const name = formData.get("name") as string;
//   const location = formData.get("location") as string;
//
//   if (!name || !location) {
//     return {
//       success: false,
//       error: "Name and location are required",
//       data: null,
//     };
//   }
//
//   try {
//     const session = await auth();
//     if (!session?.strapiToken) {
//       throw new Error("No authentication token found");
//     }
//
//     const payload = { data: { name, location } };
//     const response = await strapiRequest("POST", "/missionaries", {
//       data: payload,
//       requireAuth: true,
//     });
//
//     if (response.data) {
//       // Revalidate paths
//       revalidatePath("/dashboard/missionaries");
//       revalidatePath("/");
//       return { success: true, data: response.data };
//     }
//
//     return {
//       success: false,
//       error: response.error || "An error occurred",
//       data: null,
//     };
//   } catch (error: any) {
//     console.error("Error creating missionary:", error);
//     return {
//       success: false,
//       error: error.message || "An unexpected error occurred",
//       data: null,
//     };
//   }
// }

export async function deleteMissionary(id: number): Promise<FormState> {
  try {
    const session = await auth();
    if (!session?.strapiToken) {
      throw new Error("No authentication token found");
    }

    const response = await strapiRequest("DELETE", `/missionaries/${id}`, {
      requireAuth: true,
    });

    if (response.data) {
      // Revalidate paths
      revalidatePath("/dashboard/missionaries");
      revalidatePath("/");
      return { success: true, data: response.data };
    }

    return {
      success: false,
      error: response.error || "An error occurred",
      data: null,
    };
  } catch (error: any) {
    console.error("Error deleting missionary:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
      data: null,
    };
  }
}
