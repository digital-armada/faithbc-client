import { z } from "zod";

export const AnnouncementSchema = z.object({
  id: z.number(),
  message: z.string().min(3, { message: "Minimum 3 characters" }),
  announcementDate: z.string().min(1, { message: "Date is required" }),
  announcementTime: z
    .string()
    .min(1, { message: "Time is required" })
    .optional()
    .nullable(),
});

export type Announcement = z.infer<typeof AnnouncementSchema>;

export const CreateAnnouncementSchema = AnnouncementSchema.omit({
  id: true,
});

export type CreateAnnouncementType = z.infer<typeof CreateAnnouncementSchema>;

// export const UpdateAnnouncementSchema = z.object({
//   id: z.number(),
//   message: z.string().min(3),
//   announcementDate: z.date(),
//   announcementTime: z.string().optional(),
// });
//
// export type UpdateAnnouncementInputDto = z.infer<
//   typeof UpdateAnnouncementSchema
// >;
