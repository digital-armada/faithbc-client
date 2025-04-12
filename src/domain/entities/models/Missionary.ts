import { PrayerRequestSchema } from "@/src/domain/entities/models/PrayerRequest";
import { z } from "zod";
// import PrayerRequest from "./PrayerRequest";

export const MissionarySchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  prayerrequests: z.array(PrayerRequestSchema).optional(),
});

export type Missionary = z.infer<typeof MissionarySchema>;

export const CreateMissionarySchema = MissionarySchema.omit({
  id: true,
});

export type CreateMissionaryType = z.infer<typeof CreateMissionarySchema>;

// export interface Missionary {
//   id: number;
//   name: string;
//   location: string;
//   prayerrequests: PrayerRequest[];
// }

// export default Missionary;
