"use client";

import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  CreateAnnouncementSchema,
  CreateAnnouncementType,
} from "@/src/domain/entities/models/Announcement";
import { createNewAnnouncement } from "@/features/announcements/actions";

export default function AnnouncementForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateAnnouncementType>({
    resolver: zodResolver(CreateAnnouncementSchema),
  });

  const onSubmit: SubmitHandler<CreateAnnouncementType> = async (formData) => {
    const result = await createNewAnnouncement(formData);

    if (result?.message) {
      toast({
        title: "Error creating announcement",
        description: typeof result.message === "string" ? result.message : "",
      });
    }
    if (result?.success) {
      toast({ title: "Announcement created successfully" });
    }
    reset();
  };

  return (
    <div className="mb-10">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
          <div className="my-2 flex-1">
            <div className="mt-2">
              <Input
                id="message"
                type="text"
                className="w-full"
                placeholder="Enter announcement ..."
                {...register("message")}
              />
            </div>
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
            {/* {state?.error && (
              <p className="text-red-500">{state.inputErrors?.message}</p>
            )} */}
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
                type="date"
                className="w-full"
                {...register("announcementDate")}
              />
            </div>
            {errors.announcementDate && (
              <p className="text-red-500">{errors.announcementDate.message}</p>
            )}
            {/* {state?.error && (
              <p className="text-red-500">
                {state.inputErrors?.announcementDate}
              </p>
            )} */}

            <Label
              htmlFor="announcementTime"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Select Time
            </Label>
            <Input
              id="announcementTime"
              type="time"
              className="w-full"
              {...register("announcementTime", { required: false })}
            />
          </div>

          <Submit isSubmitting={isSubmitting} />
        </div>
        {/* {state?.error && <p>Error: {state.message}</p>} */}
      </form>
    </div>
  );
}

function Submit({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" className="my-2">
      {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
    </Button>
  );
}
