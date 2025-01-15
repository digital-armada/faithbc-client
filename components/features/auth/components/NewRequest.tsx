"use client";

import PendingSubmitButton from "@/components/ui/PendingSubmitButton";
import { useFormState } from "react-dom";
import confirmationNewRequestAction from "@/app/(auth)/confirmation/new-request/_components/confirmationNewRequestAction";

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

  return (
    <div className="mx-auto my-8 max-w-lg rounded-sm bg-zinc-100 p-8">
      <h2 className="mb-8 text-center text-2xl font-bold text-blue-400">
        Confirmation request
      </h2>
      <p className="mb-4">
        Request a new confirmation email. Maybe some info about token expiry or
        limited request here.
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
