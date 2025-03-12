import { number, string, z } from "zod";

export const postSchema = z.object({
    id: number().nullable().optional(),
    title: string().trim().min(1),
    slug: string().trim().min(1),
    content: string().trim().min(1),
});