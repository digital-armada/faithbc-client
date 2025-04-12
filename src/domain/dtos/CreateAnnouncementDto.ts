import { CreateAnnouncementSchema } from "@/src/domain/entities/models/Announcement";
import { z } from "zod";

export type CreateAnnouncementDto = z.infer<typeof CreateAnnouncementSchema>;
