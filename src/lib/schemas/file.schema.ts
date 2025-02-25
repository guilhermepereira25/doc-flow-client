import { z } from "zod";
import { components } from "../schema";

export type File = components["schemas"]["File"];

export const createFileSchema = z.object({
    name: z.string(),
    type: z.string(),
    event_id: z.string(),
});

export type CreateFile = z.infer<typeof createFileSchema>;