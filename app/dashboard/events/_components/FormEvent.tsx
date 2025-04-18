"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RHFFormDatePicker } from "@/components/ui/RHFFormDatePicker";
import { MediaUpload } from "@/components/blocks/MediaUpload";
import Editor from "./Editor";
import { createEvent, updateEvent } from "@/data/actions/event-action";
import { Event } from "@/features/events/types";
import formatTimeString from "@/lib/timeHelper";

interface FormEventProps {
  data?: Event;
  eventID?: number;
}

export default function FormEvent({ data, eventID }: FormEventProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValues = {
    title: data?.attributes?.title || "",
    slug: data?.attributes?.slug || "",
    content: data?.attributes?.content || "",
    eventStartDate: data?.attributes?.eventStartDate || null,
    eventEndDate: data?.attributes?.eventEndDate || null,
    eventStartTime: data?.attributes?.eventStartTime || "",
    eventEndTime: data?.attributes?.eventEndTime || "",
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
  console.log("Form Errors:", errors);

  const onSubmit = async (formData: typeof defaultValues) => {
    try {
      setSubmitError(null);

      const formattedData = {
        ...formData,
        eventStartTime: formData.eventStartTime
          ? formatTimeString(formData.eventStartTime)
          : null,
        eventEndTime: formData.eventEndTime
          ? formatTimeString(formData.eventEndTime)
          : null,
        eventEndDate: formData.eventEndDate || null,
        eventStartDate: formData.eventStartDate || null,
      };

      const response = eventID
        ? await updateEvent(eventID, formattedData)
        : await createEvent(formattedData);
      // if (response.error) {
      //   throw new Error(response.error || "Failed to submit form");
      // }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  };

  const clearEndDateTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValue("eventStartDate", "");
    setValue("eventStartTime", "");
    setValue("eventEndDate", "");
    setValue("eventEndTime", "");
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

          {/* /// FILE UPLOAD */}
          <div className="space-y-2">
            <Label>Featured Image</Label>
            {/* <MediaUpload
              type="image"
              onUploadComplete={(data) => {
                setValue("featuredImage", data?.id ?? null);
              }}
              preview={data?.attributes?.featuredImage?.data?.attributes?.url}
            /> */}
          </div>

          {/* /// CONTENT */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              onContentChange={(value) => setValue("content", value)}
              content={getValues("content")}
            />
          </div>

          {/* /// DATES */}
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-1 space-y-4 pb-4">
                <Controller
                  name="eventStartDate"
                  control={control}
                  render={({ field: { value, ...fieldProps } }) => {
                    return (
                      <RHFFormDatePicker
                        label="Event Start Date"
                        name="eventStartDate"
                        setValue={setValue}
                        defaultValue={value}
                        className="w-full"
                      />
                    );
                  }}
                />
                <Input type="time" {...register("eventStartTime")} />
              </div>

              <div className="col-span-1 space-y-4 pb-4">
                <Controller
                  name="eventEndDate"
                  control={control}
                  render={({ field: { value, ...fieldProps } }) => {
                    return (
                      <RHFFormDatePicker
                        label="Event End Date"
                        name="eventEndDate"
                        setValue={setValue}
                        defaultValue={value}
                        className="w-full"
                      />
                    );
                  }}
                />
                <Input type="time" {...register("eventEndTime")} />
              </div>
            </div>
            <Button onClick={clearEndDateTime} className="w-full">
              Reset Dates
            </Button>
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
            <Input
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
