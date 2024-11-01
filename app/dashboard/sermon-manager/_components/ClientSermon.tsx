"use client";

import React, { use, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateSermon } from "@/data/actions/sermon-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Speaker } from "./Speaker";
import { AudioUploader } from "./audio-uploader";
import { ClipboardComponent } from "./ClipboardComponent";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  service_type: z.string().optional(),
  slug: z.string().min(1, "Required"),
  youtube: z.string().optional(),
  verse: z.string().optional().nullable(),
  description: z.string(),
  speaker: z.string().optional().nullable(),
  series: z.string().optional(),
  youtubeId: z.string(),
  imageUrl: z.string(),
  audio: z.number().optional(),
  audioUrl: z.string().optional(),
  audioName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Sermon {
  id: string;
  attributes: {
    name: string;
    date: string;
    service_type?: string;
    slug: string;
    youtube?: string;
    verse?: string | null;
    description: string;
    youtubeId: string;
    imageUrl: string;
    audio?: {
      data?: { id: number; attributes: { name: string; url: string } };
    };
    series?: { data?: { id: string } };
    speaker?: { data?: { id: string } };
  };
}

interface Speaker {
  id: string;
  attributes: { speaker: string };
}

interface Series {
  id: string;
  attributes: { name: string };
}

interface ClientSermonProps {
  sermon: Sermon;
  speakers: { data: Speaker[] };
  series: { data: Series[] };
}

export default function ClientSermon({
  sermon,
  speakers,
  series,
}: ClientSermonProps) {
  const [audioFileId, setAudioFileId] = useState<number | null>(
    sermon.attributes.audio?.data?.id || null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // comment
  const methods = useForm<FormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: sermon.id,
      name: sermon.attributes.name,
      date: sermon.attributes.date,
      service_type: sermon.attributes.service_type || "",
      slug: sermon.attributes.slug,
      youtube: sermon.attributes.youtube,
      verse: sermon.attributes.verse,
      description: sermon.attributes.description,
      youtubeId: sermon.attributes.youtubeId,
      imageUrl: sermon.attributes.imageUrl,
      audio: sermon.attributes.audio?.data?.id,
      audioName: sermon.attributes.audio?.data?.attributes?.name,
      audioUrl: sermon.attributes.audio?.data?.attributes?.url,
      series: sermon.attributes.series?.data?.id,
      speaker: sermon.attributes.speaker?.data?.id,
    },
  });
  const { handleSubmit, register, setValue, watch } = methods;
  console.log("watch", watch());

  const title = watch("name");

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);
    try {
      const updatedSermon = {
        ...formData,
        audio: audioFileId,
      };
      const result = await updateSermon(updatedSermon);
      console.log("Result from updateSermon:", result);
      // toast({
      //   title: "Sermon Updated",
      //   description: "The sermon has been successfully updated.",
      // });
    } catch (error) {
      console.error("Error in form submission:", error);
      // toast({
      //   title: "Update Failed",
      //   description: "Failed to update the sermon. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    "Sunday Morning",
    "Sunday Evening",
    "Wednesday Evening",
    "Friday Youth",
    "Sunday School",
    "Special Events",
  ];

  if (!sermon || !speakers || !series) {
    return <div>Loading...</div>;
  }

  console.log("series", series);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name">Sermon Title</Label>
          <Input {...register("name")} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input {...register("slug")} disabled />
        </div>
        <div>
          <Label htmlFor="date">Date Preached</Label>
          <Input {...register("date")} type="date" />
        </div>
        <div>
          <Label htmlFor="service_type">Service Type</Label>
          {/* <Select
            {...register("service_type")}
            options={serviceTypes.map((type) => ({ value: type, label: type }))}
          /> */}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea {...register("description")} />
        </div>
        <div>
          <Label htmlFor="verse">Verse</Label>
          <Input {...register("verse")} />
        </div>
        <div>
          <Label htmlFor="series">Series</Label>
          {/* <Select
            {...register("series")}
            options={[
              { value: "", label: "Select a Series" },
              ...series.data.map((s) => ({
                value: s.id,
                label: s.attributes.name,
              })),
            ]}
          /> */}
        </div>
        <div>
          <Speaker speakerList={speakers.data} />
        </div>
        <ClipboardComponent youtube={sermon.attributes.youtube || ""} />
        <AudioUploader
          audioFileId={audioFileId}
          setAudioFileId={setAudioFileId}
          setValue={setValue}
          watch={watch}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>{" "}
        {error && <div className="text-sm text-red-500">{error}</div>}
      </form>
    </FormProvider>
  );
}
