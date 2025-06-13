"use server"

import { getPostBySlug, updatePostById } from "@/lib/db/queries/posts";
import { actionFailure } from "@/lib/types/action-result";
import { Tag } from "emblor";
import { redirect } from "next/navigation";
import { number, string, z } from "zod";

export const postSchema = z.object({
    id: number(),
    title: string().trim().min(1),
    slug: string().trim().min(1),
    content: string().trim().min(1),
});

export default async function updatePostAction(id: number, title: string, slug: string, content: string, isPublished: boolean, tags: Tag[]) {
    const validationResult = postSchema.safeParse({title, slug, content});
    
    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const post = await getPostBySlug(slug);
    if(post?.id != id) {
        return actionFailure({slug: ["This slug is taken"]});
    }

    await updatePostById(id, title, slug, content, isPublished, tags.map(tag => tag.text));

    redirect("/admin/posts");
}