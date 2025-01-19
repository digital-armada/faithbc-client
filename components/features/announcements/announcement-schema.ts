import { z } from "zod";

export const announcementSchema = z.object({
  message: z.string().min(1, "Message is required"),
  announcementDate: z.string({
    required_error: "Date is required",
  }),
  announcementTime: z.string().min(1, "Time is required"),
});
