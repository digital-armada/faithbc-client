// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateSermon } from "@/data/actions/sermon-actions";
import FileUploader from "./FileUploader";
import { convertVideo } from "@/data/ytConvert";

// Types for the response structure
type FileResponse = {
  id: number;
  name: string;
  url: string;
  mime: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  size: number;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  folderPath: string;
};

type ConversionResult = {
  data: {
    data: FileResponse[];
    success: boolean;
  };
};

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

export default function ClientSermon({ sermon, speakers, series }) {
  const [audioFileId, setAudioFileId] = useState(
    sermon.attributes.audio?.data?.id || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: sermon.id || "",
      name: sermon.attributes.name,
      date: sermon.attributes.date,
      service_type: sermon?.attributes?.service_type || "",
      slug: sermon.attributes.slug,
      youtube: sermon.attributes.youtube,
      verse: sermon.attributes.verse,
      description: sermon.attributes.description,
      youtubeId: sermon.attributes.youtubeId,
      imageUrl: sermon.attributes.imageUrl,
      audio: sermon.attributes.audio?.data?.id || null,
      audioName: sermon.attributes.audio?.data?.attributes?.name || null,
      audioUrl: sermon.attributes.audio?.data?.attributes?.url || null,
      series: sermon.attributes.series?.data?.id || null,
      speaker: sermon.attributes.speaker?.data?.id || "",
    },
  });
  console.log("debug", sermon);
  const onSubmit = async (formData) => {
    try {
      console.log("Submitting form with data:", formData);
      const result = await updateSermon({
        ...formData,
        audio: audioFileId,
      });
      console.log("Result from updateSermon:", result);
    } catch (error) {
      console.error("Error in form submission:", error);
      setError("Failed to update sermon");
    }
  };

  const handleFileUpload = (result) => {
    if (result && Array.isArray(result) && result[0]) {
      const fileId = result[0].id;
      setAudioFileId(fileId);
      setValue("audio", fileId, { shouldValidate: true });
      setValue("audioUrl", result[0].url);
      setValue("audioName", result[0].name);
    }
  };

  const handleConvertVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await convertVideo(sermon.attributes.youtube);

      console.log("Conversion result:", result);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (
        result.data?.data &&
        Array.isArray(result.data.data) &&
        result.data.data.length > 0
      ) {
        const fileData = result.data.data[0];
        setAudioFileId(fileData.id);
        setValue("audio", fileData.id, { shouldValidate: true });
        setValue("audioUrl", fileData.url);
        setValue("audioName", fileData.name);
      } else {
        setError("No audio file was generated from the conversion");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
      console.error("Error in video conversion:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!sermon || !speakers || !series) {
    return <div>Loading...</div>;
  }

  const speakerList = speakers.data.map((speaker) => (
    <option key={speaker.id} value={parseInt(speaker.id)}>
      {speaker.attributes.speaker}
    </option>
  ));

  const seriesList = series.data.map((serie) => (
    <option key={serie.id} value={serie.id}>
      {serie.attributes.name}
    </option>
  ));

  const serviceTypes = [
    "Sunday Morning",
    "Sunday Evening",
    "Wednesday Evening",
    "Friday Youth",
    "Sunday School",
    "Special Events",
  ];

  const serviceTypeList = serviceTypes.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sermon Title
          </label>
          <input
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Preached
          </label>
          <input
            {...register("date")}
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.date && (
            <span className="text-sm text-red-500">{errors.date.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <select
            {...register("service_type")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            {serviceTypeList}
          </select>
          {errors.service_type && (
            <span className="text-sm text-red-500">
              {errors.service_type.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={4}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Verse
          </label>
          <input
            {...register("verse")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.verse && (
            <span className="text-sm text-red-500">{errors.verse.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Series
          </label>
          <select
            {...register("series")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select a Series</option>
            {seriesList}
          </select>
          {errors.series && (
            <span className="text-sm text-red-500">
              {errors.series.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            {...register("slug")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.slug && (
            <span className="text-sm text-red-500">{errors.slug.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speaker
          </label>
          <select
            {...register("speaker")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select a Speaker</option>
            {speakerList}
          </select>
          {errors.speaker && (
            <span className="text-sm text-red-500">
              {errors.speaker.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <input type="hidden" {...register("audio")} />
          <input type="hidden" {...register("audioUrl")} />
          <input type="hidden" {...register("audioName")} />

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleConvertVideo}
              disabled={loading}
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Converting..." : "Convert YouTube to MP3"}
            </button>

            {error && <div className="text-sm text-red-500">{error}</div>}

            {audioFileId && (
              <div className="space-y-2">
                <div className="text-sm text-green-500">
                  Audio file successfully converted
                </div>
                <div className="text-xs text-gray-600">
                  File: {watch("audioName")}
                </div>
                {watch("audioUrl") && (
                  <audio controls className="w-full">
                    <source src={watch("audioUrl")} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            )}
          </div>

          <FileUploader
            allowedTypes={["audio/mpeg", "audio/ogg", "audio/wav"]}
            onUpload={handleFileUpload}
            multiple={false}
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          Save Changes
        </button>

        {error && <div className="text-sm text-red-500">{error}</div>}

        {/* Debug info - remove in production */}
        <div className="mt-4 rounded-md bg-gray-100 p-4 text-sm">
          <pre className="whitespace-pre-wrap">
            Form Errors: {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      </div>
    </form>
  );
}
