"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewCommGroup } from "@/features/comms/comms-actions";
import { useFormState } from "react-dom";

const INITIAL_STATE = {
  data: "",
  error: "",
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
          <Input
            type="text"
            id="list"
            name="list"
            required
            placeholder="Add new ..."
            className="w-full rounded-l-md px-2 py-1"
          />
          {formState.error && (
            <p aria-live="polite" className="mt-1 text-sm text-red-500">
              {formState.error}
            </p>
          )}
          {formState.data && (
            <p aria-live="polite" className="mt-1 text-sm text-green-500">
              Group created successfully!
            </p>
          )}
        </div>

        <Button type="submit" className="flex-none">
          Create
        </Button>
      </form>
    </div>
  );
}
