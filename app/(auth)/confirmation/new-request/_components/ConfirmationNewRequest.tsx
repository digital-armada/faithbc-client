"use client";

import { useFormState } from "react-dom";
import confirmationNewRequestAction from "./confirmationNewRequestAction";
import PendingSubmitButton from "../../../../../components/ui/PendingSubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/blocks/SubmitButton";

type InputErrorsT = {
  email?: string[];
};

type InitialFormStateT = {
  error: false;
};

type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type ConfirmationNewRequestFormStateT =
  | InitialFormStateT
  | ErrorFormStateT;

const initialState: InitialFormStateT = {
  error: false,
};

export default function ConfirmationNewRequest() {
  const [state, formAction] = useFormState<
    ConfirmationNewRequestFormStateT,
    FormData
  >(confirmationNewRequestAction, initialState);

  console.log(state);

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Confirmation request</CardTitle>
          <CardDescription>
            <p className="mb-2">
              Please enter your email to receive an activation link to the
              provided email.
            </p>
          </CardDescription>
        </CardHeader>
        <form action={formAction} className="my-2">
          <CardContent>
            <div className="mb-3">
              <Label htmlFor="identifier">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                required
              />
            </div>
            {/* <div className="mb-3">
              <PendingSubmitButton />
            </div> */}
            <CardFooter className="flex flex-col">
              <SubmitButton
                className="w-full"
                text="Send Request"
                loadingText="Loading"
                // loading={loading}
              />
            </CardFooter>
          </CardContent>
        </form>
      </Card>
    </>
  );
}
