// @ts-nocheck
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateSermon } from "@/data/actions/sermon-actions";
import FileUploader from "./FileUploader";

// Uncomment and define your form schema if needed
// const formSchema = z.object({
//   id: z.string(),
//   name: z.string().min(1, "Required"),
//   date: z.string().min(1, "Required"),
//   service_type: z.string(),
//   slug: z.string().min(1, "Required"),
//   youtube: z.string(),
//   verse: z.string().optional(),
//   description: z.string(),
//   speaker: z.string(),
//   series: z.string(),
//   youtubeId: z.string(),
//   imageUrl: z.string(),
//   audioFile: z.instanceof(File).optional(), // Add this line for audio file
// });

// type FormValues = z.infer<typeof formSchema>;

export default function ClientSermon({ sermon, speakers, series }) {
  const [audioFile, setAudioFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: sermon.id || "",
      name: sermon.attributes.name,
      date: sermon.attributes.date,
      service_type: sermon.attributes.service_type || "",
      slug: sermon.attributes.slug,
      youtube: sermon.attributes.youtube,
      verse: sermon.attributes.verse,
      description: sermon.attributes.description,
      speaker: sermon.attributes.speaker?.data?.id || "",
      series: sermon.attributes.series?.data?.id || null,
      youtubeId: sermon.attributes.youtubeId,
      imageUrl: sermon.attributes.imageUrl,
    },
  });

  const onSubmit = async (formData) => {
    // Prepare the data for submission
    const dataToUpdate = {
      ...formData,
      audioFile, // Include the audio file in the payload
    };

    // Call the update function
    await updateSermon(dataToUpdate);
  };

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Sermon Title</label>
          <input {...register("name")} />
          {errors.name && <span>{errors?.name?.message}</span>}
        </div>

        <div>
          <label>Date Preached</label>
          <input {...register("date")} type="date" />
          {errors.date && <span>{errors.date.message}</span>}
        </div>

        <div>
          <label>Service Type</label>
          <select {...register("service_type")}>
            <option value="">Select Service Type</option>
            {serviceTypeList}
          </select>
          {errors.service_type && <span>{errors.service_type.message}</span>}
        </div>

        <div>
          <label>Description</label>
          <textarea {...register("description")} />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div>
          <label>Verse</label>
          <input {...register("verse")} />
          {errors.verse && <span>{errors.verse.message}</span>}
        </div>

        <div>
          <label>Series</label>
          <select {...register("series")}>
            <option value="">Select Series</option>
            {seriesList}
          </select>
          {errors.series && <span>{errors.series.message}</span>}
        </div>

        <div>
          <label>Slug</label>
          <input {...register("slug")} />
          {errors.slug && <span>{errors.slug.message}</span>}
        </div>

        <div>
          <label>Speakers</label>
          <select {...register("speaker")}>
            <option value="">Select Speaker</option>
            {speakerList}
          </select>
          {errors.speaker && <span>{errors.speaker.message}</span>}
        </div>

        {/* Display existing audio if available */}
        {sermon.attributes.audio?.data && (
          <div>
            <h3>Existing Audio:</h3>
            {/* Display audio player */}
            <audio controls>
              <source
                src={sermon.attributes.audio.data.attributes.url}
                type="audio/mpeg"
              />
              Your browser does not support the audio tag.
            </audio>
            {/* Optionally show file name */}
            <p>{sermon.attributes.audio.data.attributes.name}</p>
          </div>
        )}

        {/* Audio File Input */}
        {/* <div>
          <label>Upload New Audio File</label>
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
        </div> */}
        <FileUploader
          allowedTypes={["audio/mpeg", "audio/ogg", "audio/wav"]}
          onUpload={(result) => console.log("Audio uploaded:", result)}
          multiple={false}
        />
        {/* Display selected audio file name */}
        {audioFile && <p>Selected File: {audioFile.name}</p>}

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
