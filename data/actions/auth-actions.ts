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
import { signIn, auth, signOut } from "@/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { LoginSchema } from "@/schemas";
// export const DEFAULT_LOGIN_REDIRECT = "/profile";

// import { ConfirmationNewRequestFormStateT } from "./ConfirmationNewRequest";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const logout = async () => {
  try {
    await signOut({ redirect: false }); // Avoid server-side redirection
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to sign out" };
  }
};

export async function signinUserAction({ data }) {
  console.log("signinUserAction", data);
  try {
    const result = await signIn("credentials", { ...data, redirect: false });
    console.log(result);
    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          };
        case "AccessDenied":
          return {
            success: false,
            error:
              "Please verify your email, sign up again to resend verification email",
            statusCode: 401,
          };
        // custom error
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error: "Login with your Google or Github account",
            statusCode: 401,
          };
        default:
          return {
            success: false,
            error: "Oops. Something went wrong",
            statusCode: 500,
          };
      }
    }

    console.error(err);
    return {
      success: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}
export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("registerUserAction", formData);

  const userData: RegisterUserProps = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
  };

  const responseData = await registerUserService(userData);

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
      // return { error: "An unknown error occurred" };
    }

    throw error; // This needs to be here or wont redirect
  }
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
