import { z } from "zod";

export const announcementSchema = z.object({
  message: z.string().min(1, "Message is required"),
  announcementDate: z.string().refine((date) => date.length > 0, {
    message: "Date is required",
  }),
  announcementTime: z.string().nullable().optional(),
});
