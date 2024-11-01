"use client";

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

interface EventData {
  id?: string;
  slug?: string;
  title: string;
  content: string;
  startDate: string;
  endDate?: string;
  featuredImage?: string;
  organiser?: string;
  venName?: string;
  venAdd?: string;
  internal: boolean;
}

interface FormEventProps {
  data?: EventData;
  eventID: string;
}

export default function FormEvent({ data, eventID }: FormEventProps) {
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    data?.featuredImage || null,
  );
  const [content, setContent] = useState(data?.content || "");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    setError,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<EventData>({
    defaultValues: {
      ...data,
      internal: data?.internal ?? false,
    },
  });
  console.log("watching you", watch());
  console.log("content", watch("content"));
  const onSubmit = async (formData: EventData) => {
    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        submitData.append(key, value.toString());
      }
    });

    if (featuredImage) {
      submitData.append("featuredImage", featuredImage);
    }

    console.log("submitData", submitData);

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
              content={content}
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
            <EventImageUpload
              onImageUploaded={setFeaturedImage}
              preview={featuredImage || undefined}
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
