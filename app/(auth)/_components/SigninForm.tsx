"use client";
import { Button } from "@/components/ui/button";

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

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { ZodErrors } from "@/components/custom/ZodErrors";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import { SubmitButton } from "@/components/custom/SubmitButton";

import { FormErrorsT } from "@/types/types";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
  showConfirmationError: false,
};

function ConfirmationError() {
  return (
    <p>
      It looks like you {"haven't"} confirmed your email yet. Check your email
      client for a confirmation email. Did not find it?{" "}
      <Link href="/confirmation/newrequest" className="underline">
        Resend the confirmation email.
      </Link>
    </p>
  );
}

export default function SignInForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  console.log(formState);
  // const [data, setData] = useState(initialData);
  // const [errors, setErrors] = useState<FormErrorsT>({});
  // const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  // listen for unconfirmed email
  // const hasConfirmationError =
  //   errors.strapiError === "Your account email is not confirmed";

  //   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //     setData({
  //       ...data,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  //
  //   async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault();
  //     setLoading(true);
  //
  //     const validatedFields = formSchema.safeParse(data);
  //
  //     if (!validatedFields.success) {
  //       setErrors(validatedFields.error.formErrors.fieldErrors);
  //       /**
  //              {
  //                 identifier: [ 'String must contain at least 2 character(s)' ],
  //                 password: [ 'Password must be at least 6 characters long.' ]
  //               }
  //          */
  //       setLoading(false);
  //     } else {
  //       // no zod errors
  //       const signInResponse = await signIn("credentials", {
  //         identifier: data.identifier,
  //         password: data.password,
  //         redirect: false,
  //       });
  //       console.log(signInResponse);
  //
  //       if (signInResponse && !signInResponse?.ok) {
  //         setErrors({
  //           strapiError: signInResponse.error
  //             ? signInResponse.error
  //             : "Something went wrong.",
  //         });
  //         setLoading(false);
  //       } else {
  //         // handle success
  //         router.push(callbackUrl);
  //         router.refresh();
  //       }
  //     }
  //   }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <form action={formAction} className="my-4">
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
                // value={data.identifier}
                // onChange={handleChange}
              />

              {/* <ZodErrors error={formState?.zodErrors?.identifier} /> */}

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
                // value={data.password}
                // onChange={handleChange}
              />
              <ZodErrors error={formState?.zodErrors?.password} />
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
              />
              {formState?.message}
              <StrapiErrors error={formState?.strapiErrors} />
              {formState?.showConfirmationError && <ConfirmationError />}
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
