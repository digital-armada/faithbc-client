"use client";

import { createNewCommGroup } from "@/data/actions/comms-actions";
import { useFormState } from "react-dom";

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default function CommsForm() {
  const [formState, formAction] = useFormState(
    createNewCommGroup,
    INITIAL_STATE,
  );

  return (
    <div>
      <form action={formAction} className="my-2 flex">
        <div className="flex-1">
          <input
            type="text"
            id="list"
            name="list"
            required
            placeholder="Add new ..."
            className="w-full rounded-l-md px-2 py-1"
          />
          {formState.error && (
            <p aria-live="polite" className="error">
              {formState.error}
            </p>
          )}
          {formState.data && (
            <p aria-live="polite" className="success">
              Group created successfully!
            </p>
          )}
        </div>

        <button
          type="submit"
          className="flex-none rounded-r-md bg-slate-400 px-2 py-1"
        >
          Create
        </button>
      </form>
    </div>
  );
}
