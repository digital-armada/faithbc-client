import { z } from "zod";
// export interface PrayerRequest {
//   name: string;
//   request: string;
//   date: Date;
//   outcome: string;
//   status: string;
// }
//
// export default PrayerRequest;

export const PrayerRequestSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters" }),
  request: z.string().min(3, { message: "Minimum 3 characters" }),
  date: z.date(),
  outcome: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
});
