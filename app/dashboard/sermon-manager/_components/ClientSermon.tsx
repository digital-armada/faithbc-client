// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateSermon } from "@/data/actions/sermon-actions";
import FileUploader from "./FileUploader";
import { convertVideo } from "@/data/ytConvert";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  service_type: z.string().optional(),
  slug: z.string().min(1, "Required"),
  youtube: z.string().optional(),
  verse: z.string().optional().nullable(),
  description: z.string(),
  speaker: z.string().optional(),
  series: z.string().optional(),
  youtubeId: z.string(),
  imageUrl: z.string(),
  audio: z.number().optional(),
});

export default function ClientSermon({ sermon, speakers, series }) {
  const [audioFileId, setAudioFileId] = useState(
    sermon.attributes.audio?.data?.id || null,
  );
  const [loading, setLoading] = useState(false); // State for loading feedback

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
      speaker: sermon.attributes.speaker?.data?.id || "",
      series: sermon.attributes.series?.data?.id || null,
      youtubeId: sermon.attributes.youtubeId,
      imageUrl: sermon.attributes.imageUrl,
      audio: sermon.attributes.audio?.data?.id || null,
    },
  });

  const onSubmit = async (formData) => {
    try {
      console.log("Submitting form with data:", formData);
      const result = await updateSermon({
        ...formData,
        audio: audioFileId, // Ensure this aligns with uploaded file ID
      });
      console.log("Result from updateSermon:", result);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handleFileUpload = (result) => {
    if (result && Array.isArray(result) && result[0]) {
      const fileId = result[0].id;
      setAudioFileId(fileId);
      setValue("audio", fileId, { shouldValidate: true });
    }
  };

  const handleConvertVideo = async () => {
    setLoading(true); // Set loading state
    try {
      const result = await convertVideo(sermon.attributes.youtube);
      console.log("File ID:", result.data[0].id);
      if (result.success) {
        const fileId = result.data[0].id; // Assuming the result includes an id
        setAudioFileId(fileId);
        setValue("audio", fileId, { shouldValidate: true });
      } else {
        console.error("Conversion failed:", result.error);
      }
    } catch (error) {
      console.error("Error in video conversion:", error);
    } finally {
      setLoading(false); // Reset loading state
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
        <select {...register("service_type")}>{serviceTypeList}</select>
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
        <select {...register("series")}>{seriesList}</select>
        {errors.series && <span>{errors.series.message}</span>}
      </div>
      <div>
        <label>Slug</label>
        <input {...register("slug")} />
        {errors.slug && <span>{errors.slug.message}</span>}
      </div>
      <div>
        <label>Speakers</label>
        <select {...register("speaker")}>{speakerList}</select>
        {errors.speaker && <span>{errors.speaker.message}</span>}
      </div>
      <input type="hidden" {...register("audio")} />
      <button type="button" onClick={handleConvertVideo} disabled={loading}>
        {loading ? "Converting..." : "Convert to MP3"}
      </button>
      <FileUploader
        allowedTypes={["audio/mpeg", "audio/ogg", "audio/wav"]}
        onUpload={handleFileUpload}
        multiple={false}
      />
      {audioFileId && (
        <div>
          <p>Current audio file ID: {audioFileId}</p>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

// // @ts-nocheck
// "use client";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { updateSermon } from "@/data/actions/sermon-actions";
// import FileUploader from "./FileUploader";
// import { convertVideo } from "@/data/ytConvert";
//
// const formSchema = z.object({
//   id: z.string(),
//   name: z.string().min(1, "Required"),
//   date: z.string().min(1, "Required"),
//   service_type: z.string().optional(),
//   slug: z.string().min(1, "Required"),
//   youtube: z.string().optional(),
//   verse: z.string().optional().nullable(),
//   description: z.string(),
//   speaker: z.string().optional(),
//   series: z.string().optional(),
//   youtubeId: z.string(),
//   imageUrl: z.string(),
//   audio: z.number().optional(),
// });
//
// export default function ClientSermon({ sermon, speakers, series }) {
//   const [audioFileId, setAudioFileId] = useState(
//     sermon.attributes.audio?.data?.id || null,
//   );
//
//   const {
//     watch,
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     // resolver: zodResolver(formSchema),
//     defaultValues: {
//       id: sermon.id || "",
//       name: sermon.attributes.name,
//       date: sermon.attributes.date,
//       service_type: sermon.attributes.service_type || "",
//       slug: sermon.attributes.slug,
//       youtube: sermon.attributes.youtube,
//       verse: sermon.attributes.verse,
//       description: sermon.attributes.description,
//       speaker: sermon.attributes.speaker?.data?.id || "",
//       series: sermon.attributes.series?.data?.id || null,
//       youtubeId: sermon.attributes.youtubeId,
//       imageUrl: sermon.attributes.imageUrl,
//       audio: sermon.attributes.audio?.data?.id || null,
//     },
//   });
//
//   // const audioValue = watch("audio");
//   // useEffect(() => {
//   //   console.log("Audio form value changed:", audioValue);
//   // }, [audioValue]);
//
//   const onSubmit = async (formData) => {
//     try {
//       console.log("Submitting form with data:", formData);
//       const result = await updateSermon({
//         ...formData,
//         audio: audioFileId, // Ensure this aligns with uploaded file ID
//       });
//       console.log("Result from updateSermon:", result);
//     } catch (error) {
//       console.error("Error in form submission:", error);
//     }
//   };
//
//   const handleFileUpload = (result) => {
//     if (result && Array.isArray(result) && result[0]) {
//       const fileId = result[0].id;
//       setAudioFileId(fileId);
//       setValue("audio", fileId, { shouldValidate: true });
//       // Ensure we update both state and form value
//     }
//   };
//
//   if (!sermon || !speakers || !series) {
//     return <div>Loading...</div>;
//   }
//
//   const speakerList = speakers.data.map((speaker) => (
//     <option key={speaker.id} value={parseInt(speaker.id)}>
//       {speaker.attributes.speaker}
//     </option>
//   ));
//
//   const seriesList = series.data.map((serie) => (
//     <option key={serie.id} value={serie.id}>
//       {serie.attributes.name}
//     </option>
//   ));
//
//   const serviceTypes = [
//     "Sunday Morning",
//     "Sunday Evening",
//     "Wednesday Evening",
//     "Friday Youth",
//     "Sunday School",
//     "Special Events",
//   ];
//
//   const serviceTypeList = serviceTypes.map((type) => (
//     <option key={type} value={type}>
//       {type}
//     </option>
//   ));
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Sermon Title</label>
//         <input {...register("name")} />
//         {errors.name && <span>{errors?.name?.message}</span>}
//       </div>
//
//       <div>
//         <label>Date Preached</label>
//         <input {...register("date")} type="date" />
//         {errors.date && <span>{errors.date.message}</span>}
//       </div>
//
//       <div>
//         <label>Service Type</label>
//         <select {...register("service_type")}>{serviceTypeList}</select>
//         {errors.service_type && <span>{errors.service_type.message}</span>}
//       </div>
//
//       <div>
//         <label>Description</label>
//         <textarea {...register("description")} />
//         {errors.description && <span>{errors.description.message}</span>}
//       </div>
//
//       <div>
//         <label>Verse</label>
//         <input {...register("verse")} />
//         {errors.verse && <span>{errors.verse.message}</span>}
//       </div>
//
//       <div>
//         <label>Series</label>
//         <select {...register("series")}>{seriesList}</select>
//         {errors.series && <span>{errors.series.message}</span>}
//       </div>
//
//       <div>
//         <label>Slug</label>
//         <input {...register("slug")} />
//         {errors.slug && <span>{errors.slug.message}</span>}
//       </div>
//
//       <div>
//         <label>Speakers</label>
//         <select {...register("speaker")}>{speakerList}</select>
//         {errors.speaker && <span>{errors.speaker.message}</span>}
//       </div>
//
//       <input type="hidden" {...register("audio")} />
//       <button
//         type="button"
//         onClick={() => convertVideo(sermon.attributes.youtube)}
//       >
//         Convert to MP3
//       </button>
//       <FileUploader
//         allowedTypes={["audio/mpeg", "audio/ogg", "audio/wav"]}
//         onUpload={handleFileUpload}
//         multiple={false}
//       />
//       {audioFileId && (
//         <div>
//           <p>Current audio file ID: {audioFileId}</p>
//         </div>
//       )}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
