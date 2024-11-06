"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormDateTimePicker } from "@/components/ui/FormDateTimePicker";
import { EventImageUpload } from "./EventImageUpload";
import Editor from "./Editor";
import { createEvent, updateEvent } from "@/data/actions/event-action";
import { useRouter } from "next/navigation";
import { MediaUpload } from "@/components/MediaUpload";

export interface EventData {
  id?: string;
  title: string; // Text
  content: string; // Rich text (Markdown)
  slug: string; // UID
  startDate: string; // Datetime
  endDate?: string; // Datetime
  featuredImage?: {
    // Media
    id: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  organiser?: string; // Text
  venName?: string; // Text
  venAdd?: string; // Text
  internal: boolean; // Boolean
}

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string(),
  slug: z.string(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  featuredImage: z
    .object({
      id: z.string(),
      url: z.string(),
      formats: z
        .object({
          thumbnail: z.object({ url: z.string() }).optional(),
          small: z.object({ url: z.string() }).optional(),
          medium: z.object({ url: z.string() }).optional(),
          large: z.object({ url: z.string() }).optional(),
        })
        .optional(),
    })
    .optional(),
  organiser: z.string().optional(),
  venName: z.string().optional(),
  venAdd: z.string().optional(),
  internal: z.boolean(),
});

interface FormEventProps {
  data?: EventData;
  eventID: string;
}

export default function FormEvent({ data, eventID }: FormEventProps) {
  const [newFeaturedImage, setNewFeaturedImage] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    setError,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<EventData>({
    defaultValues: {
      ...data,
      internal: data?.internal ?? false,
    },
  });

  console.log("watch", watch());

  const onSubmit = async (formData: EventData) => {
    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        submitData.append(key, value.toString());
      }
    });

    if (newFeaturedImage) {
      submitData.append("featuredImage", newFeaturedImage);
    }

    try {
      const result = eventID
        ? await updateEvent(submitData, eventID)
        : await createEvent(submitData);

      if (result.error) {
        setError("root", { type: "manual", message: result.error });
      } else {
        router.push("/dashboard/events");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{data ? "Edit Event" : "Create Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <div
              className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {errors.root.message}</span>
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
          <div className="grid gap-4 sm:grid-cols-2">
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
                console.log("feature image", data);
                setValue("featuredImage", data.id);
                setNewFeaturedImage(data.id);
              }}
              preview={getValues("featuredImage.data.attributes.url")}
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
              : (data ? "Update" : "Create") + " Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
