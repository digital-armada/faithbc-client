"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import React, { useState, useTransition } from "react";

import { SubmitButton } from "@/components/custom/SubmitButton";

// import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";
// type FormErrorsT = {
//   identifier?: undefined | string[];
//   password?: undefined | string[];
//   strapiError?: string;
// };
// const INITIAL_STATE = {
//   zodErrors: null,
//   strapiErrors: null,
//   data: null,
//   message: null,
//   showConfirmationError: false,
// };

const initialData = {
  identifier: "",
  password: "",
};

export default function SignInForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  // console.log(formState);
  const [data, setData] = useState(initialData);
  // const [errors, setErrors] = useState<FormErrorsT>({});
  // console.log(errors);
  // const [loading, setLoading] = useState(false);
  // const searchParams = useSearchParams();
  // // const callbackUrl = searchParams.get("callbackUrl") || "/";
  // const router = useRouter();
  // listen for unconfirmed email
  // const hasConfirmationError =
  //   errors.strapiError === "Your account email is not confirmed";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  //   async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault();
  //     setLoading(true);
  //
  //     const validatedFields = LoginSchema.safeParse(data);
  //
  //     if (!validatedFields.success) {
  //       setErrors(validatedFields.error.formErrors.fieldErrors);
  //       setLoading(false);
  //       return;
  //     }
  //
  //     const res = await signinUserAction({ data: validatedFields.data });
  //     console.log(res);
  //     if (res.success) {
  //       // Handle successful sign-in, e.g., redirect to profile page
  //       window.location.href = "/profile";
  //       setLoading(true);
  //     } else {
  //       setErrors({ general: res.error });
  //       setLoading(true);
  //     }
  //
  //     setLoading(false);
  //   }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(() => {
      loginUserAction(data)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            setSuccess(data.success ? "Login successful" : "");
            window.location.href = "/dashboard";
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      {/* <form action={formAction} className="my-4"> */}
      <form onSubmit={handleSubmit} className="my-4">
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="m@example.com"
                required
                value={data.identifier}
                onChange={handleChange}
              />

              {/* <ZodErrors error={errors?.identifier} /> */}

              {/* {errors?.identifier ? (
                <div className="text-red-700" aria-live="polite">
                  {errors.identifier[0]}
                </div>
              ) : null} */}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={data.password}
                onChange={handleChange}
              />
              {/* <ZodErrors error={errors?.password} /> */}
              {/* {errors?.password ? (
                <div className="text-red-700" aria-live="polite">
                  {errors.password[0]}
                </div>
              ) : null} */}
            </div>
            {/* <Button
              type="submit"
              className="w-full"
              disabled={loading}
              aria-disabled={loading}
            >
              Login
            </Button> */}

            <CardFooter className="flex flex-col">
              <SubmitButton
                className="w-full"
                text="Sign In"
                loadingText="Loading"
                loading={isPending}
              />
              {/* {formState?.message} */}
              {/* <StrapiErrors error={errors} /> */}
              {/* {formState?.showConfirmationError && <ConfirmationError />} */}
              {error && error}
            </CardFooter>

            {/* {errors.password || errors.identifier ? (
              <div className="text-red-700" aria-live="polite">
                Something went wrong. Please check your data.
              </div>
            ) : null}
            {hasConfirmationError ? (
              <div className="text-red-700" aria-live="polite">
                <ConfirmationError />
              </div>
            ) : null}
            {!hasConfirmationError && errors.strapiError ? (
              <div className="text-red-700" aria-live="polite">
                Something went wrong: {errors.strapiError}
              </div>
            ) : null} */}
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </CardContent>
      </form>
    </Card>
  );
}
