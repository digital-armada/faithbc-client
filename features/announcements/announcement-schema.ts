import { z } from "zod";

export const announcementSchema = z.object({
  message: z.string().min(1, "Message is required"),
  date: z.string().min(1, "Date and time is required"),
});
