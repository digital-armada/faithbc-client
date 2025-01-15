"use client";

import { useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createNewAnnouncement } from "@/components/features/announcements/announcement-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AnnouncementForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createNewAnnouncement, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.data && formRef.current) {
      toast({ title: "Announcement created successfully" });
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
            {state?.error && (
              <p className="text-red-500">{state.inputErrors?.message}</p>
            )}
          </div>

          <div className="my-2">
            <Label
              htmlFor="announcementDate"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Select date
            </Label>
            <div className="mt-2">
              <Input
                id="announcementDate"
                name="announcementDate"
                type="date"
                className="w-full"
              />
            </div>
            {state?.error && (
              <p className="text-red-500">
                {state.inputErrors?.announcementDate}
              </p>
            )}

            <Label
              htmlFor="announcementTime"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Select Time
            </Label>
            <Input
              id="announcementTime"
              name="announcementTime"
              type="time"
              className="w-full"
            />
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
