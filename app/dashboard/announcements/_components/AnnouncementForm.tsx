"use client";

import { useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createNewAnnouncement } from "@/features/announcements/announcement-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormDateTimePicker } from "@/components/ui/FormDateTimePicker";

export default function AnnouncementForm() {
  const formRef = useRef<HTMLFormElement>(null); // Specify the type as HTMLFormElement
  const [state, formAction] = useFormState(createNewAnnouncement, null);

  useEffect(() => {
    if (state?.data && formRef.current) {
      // Check if formRef.current is not null
      // If the submission was successful, reset the form
      formRef.current.reset();
    }
  }, [state]);

  return (
    <div className="mb-10">
      <form ref={formRef} action={formAction}>
        <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
          <div className="my-2 flex-1">
            <Label
              htmlFor="message"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Announcement
            </Label>
            <div className="mt-2">
              <Input
                id="message"
                name="message"
                type="text"
                className="w-full"
                placeholder=" ... Enter announcement"
              />
            </div>
            {state?.error && <p>{state.inputErrors?.message}</p>}
          </div>

          <div className="my-2">
            <Label
              htmlFor="event-date"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Select date and time
            </Label>
            <div className="mt-2">
              {/* <FormDateTimePicker
                id="event-date"
                name="event-date"
                label="date"
              /> */}
              {/* <Input
                id="event-date"
                name="event-date"
                type="datetime-local"
                className="w-full"
              /> */}
            </div>
            {state?.error && <p>{state.inputErrors?.date}</p>}
          </div>

          <Submit />
        </div>
        {/* {state?.error && <p>Error: {state.message}</p>} */}
      </form>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="my-2" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "Submit"}
    </Button>
  );
}
