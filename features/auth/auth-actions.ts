"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn, auth, signOut } from "@/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { LoginSchema } from "@/schemas";
import {
  registerUserService,
  updateUserService,
} from "../../data/services/auth-service";
import { strapiRequest } from "@/lib/strapi-service";
// export const DEFAULT_LOGIN_REDIRECT = "/profile";

// import { ConfirmationNewRequestFormStateT } from "./ConfirmationNewRequest";

export async function loginUserAction(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { identifier, password, code } = validatedFields.data;

  try {
    await signIn("credentials", {
      identifier,
      password,
      // redirectTo: callbackUrl || "/dashboard",
      redirect: false, // Handle redirect manually for more control
      callbackUrl: callbackUrl || "/dashboard",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      const credentialsError = error as CredentialsSignin;
      if (credentialsError.cause?.err?.message) {
        return { error: credentialsError.cause?.err?.message };
      }
      return { error: "An unknown error occurred" };
    }

    throw error; // This needs to be here or wont redirect
  }
}

export const logout = async () => {
  try {
    await signOut({ redirect: false }); // Avoid server-side redirection
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to sign out" };
  }
};

// ------------------------------------------------------------

export async function updateUserAction(payload: RegisterUserProps) {
  const responseData = await updateUserService(payload);

  if (!responseData) {
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      error: true,
      message: "Failed to Update",
      strapiError: responseData.error,
    };
  }

  redirect("/dashboard");
}

export async function updateUserRole(userId, roleId) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");
    // FIXME:
    const response = await strapiRequest("PUT", `/api/users/${userId}`, {
      role: roleId,
    });

    if (response.data) {
      revalidatePath("/dashboard/contacts");
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

const formSchema = z.object({
  email: z.string().email("Enter a valid email.").trim(),
});

export default async function ConfirmationNewRequest(
  // prevState: ConfirmationNewRequestFormStateT,
  formData: FormData,
) {
  const validatedFields = formSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: "Please verify your data.",
    };
  }

  const { email } = validatedFields.data;

  try {
    const strapiResponse: any = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/send-email-confirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-cache",
      },
    );

    // handle strapi error
    if (!strapiResponse.ok) {
      const response = {
        error: true,
        message: "",
      };
      // check if response in json-able
      const contentType = strapiResponse.headers.get("content-type");
      if (contentType === "application/json; charset=utf-8") {
        const data = await strapiResponse.json();

        // we don't ever want to confirm that an email exists inside strapi DB
        // but we can't redirect inside a try catch block
        // return response only is this is not the case
        // if it is the case we will fall through to the redirect
        if (data.error.message !== "Already confirmed") {
          response.message = data.error.message;
          return response;
        }
      } else {
        response.message = strapiResponse.statusText;
        return response;
      }
    }
    // we redirect on success outside try catch block
  } catch (error: any) {
    // network error or something
    return {
      error: true,
      message: "message" in error ? error.message : error.statusText,
    };
  }
  redirect("/confirmation/message");
}
