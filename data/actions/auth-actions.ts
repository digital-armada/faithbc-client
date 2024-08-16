"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  registerUserService,
  loginUserService,
  updateUserService,
} from "@/data/services/auth-service";
import { mutateData } from "../services/mutate-data";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";

// import { ConfirmationNewRequestFormStateT } from "./ConfirmationNewRequest";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const logout = async () => {
  await signOut();
};
//

export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("registerUserAction", formData);
  const responseData = await registerUserService(formData);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  redirect("/dashboard");
}

export async function updateUserAction(payload) {
  const responseData = await updateUserService(payload);

  if (!responseData) {
    return {
      // ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      // ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Update.",
    };
  }

  redirect("/dashboard");
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  console.log("validatedFields", validatedFields);

  const responseData = await loginUserService(validatedFields.data);
  console.log("responseData", responseData);
  const isConfirmed = responseData.user.confirmed;
  console.log(
    "isConfirmedisConfirmedisConfirmedisConfirmedisConfirmedisConfirmed",
    isConfirmed,
  );

  if (!responseData || responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (!isConfirmed) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      showConfirmationError: true,
      message: "Failed to Login.",
      data: responseData.user.email,
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

export async function updateUserRole(userId, roleId) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");
    const response = await mutateData("PUT", `/api/users/${userId}`, {
      role: roleId,
    });

    if (response.data) {
      revalidatePath("/dashboard/contacts");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
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
  prevState: ConfirmationNewRequestFormStateT,
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
      process.env.NEXT_PUBLIC_STRAPI_URL + "/api/auth/send-email-confirmation",
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
