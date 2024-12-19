"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormDateTimePicker } from "@/components/ui/FormDateTimePicker";
import { MediaUpload } from "@/components/MediaUpload";
import Editor from "./Editor";
import { createEvent, updateEvent } from "@/data/actions/event-action";
import { Event } from "@/features/events/types";

interface FormEventProps {
  data?: Event;
  eventID?: number;
}

export default function FormEvent({ data, eventID }: FormEventProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  console.log("startDate", data?.attributes.startDate);
  const defaultValues = {
    title: data?.attributes?.title || "",
    slug: data?.attributes?.slug || "",
    content: data?.attributes?.content || "",
    startDate: data?.attributes?.startDate || "",
    endDate: data?.attributes?.endDate || "",
    organiser: data?.attributes?.organiser || "",
    venName: data?.attributes?.venName || "",
    venAdd: data?.attributes?.venAdd || "",
    internal: data?.attributes?.internal || false,
    featuredImage: data?.attributes?.featuredImage?.data?.id || undefined,
  };

  const {
    control,
    watch,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues,
  });

  console.log("watching", watch());
  const onSubmit = async (formData: typeof defaultValues) => {
    // console.log("formData", formData);
    try {
      setSubmitError(null);
      const response = eventID
        ? await updateEvent(eventID, formData)
        : await createEvent(formData);
      console.log("back from server", response);
      // if (response.error) {
      //   throw new Error(response.error || "Failed to submit form");
      // }

      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{eventID ? "Edit Event" : "Create Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {submitError && (
            <div
              className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {submitError}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              onContentChange={(value) => setValue("content", value)}
              content={getValues("content")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <FormDateTimePicker
                  label="Start Date and Time"
                  name={field.name}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <FormDateTimePicker
                  label="End Date and Time"
                  name={field.name}
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Featured Image</Label>
            <MediaUpload
              type="image"
              onUploadComplete={(data) => {
                setValue("featuredImage", data.id);
              }}
              preview={data?.attributes?.featuredImage?.data?.attributes?.url}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organiser">Organiser</Label>
            <Input
              id="organiser"
              {...register("organiser")}
              placeholder="Enter organiser name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venName">Venue Name</Label>
            <Input
              id="venName"
              {...register("venName")}
              placeholder="Enter venue name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venAdd">Venue Address</Label>
            <Textarea
              id="venAdd"
              {...register("venAdd")}
              placeholder="Enter venue address"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="internal"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="internal"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="internal">Internal Event</Label>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : eventID
                ? "Update Event"
                : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
