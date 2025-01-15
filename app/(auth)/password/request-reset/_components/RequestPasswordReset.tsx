"use client";

import { useFormState } from "react-dom";

import PendingSubmitButton from "@/components/ui/PendingSubmitButton";
import requestPasswordResetAction from "./requestPasswordResetAction";

type InputErrorsT = {
  email?: string[];
};
type NoErrorFormStateT = {
  error: false;
  message?: string;
};
type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type RequestPasswordResetFormStateT =
  | NoErrorFormStateT
  | ErrorFormStateT;

const initialState: NoErrorFormStateT = {
  error: false,
};

export default function ForgotPassword() {
  const [state, formAction] = useFormState<
    RequestPasswordResetFormStateT,
    FormData
  >(requestPasswordResetAction, initialState);

  if (!state.error && state.message === "Success") {
    return (
      <div className="mb-8 rounded-sm bg-zinc-100 px-4 py-8">
        <h2 className="mb-4 text-lg font-bold">Check your email</h2>
        <p>
          We sent you an email with a link. Open this link to reset your
          password. Carefull, expires ...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 max-w-lg rounded-sm bg-zinc-100 p-8">
      <h2 className="mb-8 text-center text-2xl font-bold text-blue-400">
        Request a password reset
      </h2>
      <p className="mb-4">
        Forgot your password? Enter your account email here and we will send you
        a link you can use to reset your password.
      </p>
      <form action={formAction} className="my-8">
        <div className="mb-3">
          <label htmlFor="email" className="mb-1 block">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-sm border border-zinc-300 bg-white p-2"
          />
          {state.error && state?.inputErrors?.email ? (
            <div className="text-red-700" aria-live="polite">
              {state.inputErrors.email[0]}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <PendingSubmitButton />
        </div>
        {state.error && state.message ? (
          <div className="text-red-700" aria-live="polite">
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
