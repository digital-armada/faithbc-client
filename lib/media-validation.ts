import { z } from "zod";

export const MAX_FILE_SIZE = 1000000000; // 1GB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3"];

export const mediaSchema = z.object({
  file: z
    .any()
    .refine(
      (file) => file?.size !== 0 && file?.name !== undefined,
      "File is required.",
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Max file size is ${MAX_FILE_SIZE / 1000000000}MB.`,
    ),
});

export const imageSchema = mediaSchema.extend({
  file: mediaSchema.shape.file.refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    ".jpg, .jpeg, .png and .webp files are accepted.",
  ),
});

export const audioSchema = mediaSchema.extend({
  file: mediaSchema.shape.file.refine(
    (file) => ACCEPTED_AUDIO_TYPES.includes(file?.type),
    ".mp3 and .wav files are accepted.",
  ),
});
