import { CreateMissionarySchema } from "@/src/domain/entities/models/Missionary";
import { z } from "zod";

export type CreateMissionaryDto = z.infer<typeof CreateMissionarySchema>;
