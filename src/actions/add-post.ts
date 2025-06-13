"use server"

import { addPost, getPostBySlug } from "@/lib/db/queries/posts";
import { actionFailure } from "@/lib/types/action-result";
import { Tag } from "emblor";
import { redirect } from "next/navigation";import { string, z } from "zod";

export const postSchema = z.object({
    title: string().trim().min(1),
    slug: string().trim().min(1),
    content: string().trim().min(1),
});

export default async function addPostAction(title: string, slug: string, content: string, isPublished: boolean, tags: Tag[]) {
    const validationResult = postSchema.safeParse({title, slug, content});

    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const post = await getPostBySlug(slug);
    if(post) {
        return actionFailure({slug: ["This slug is taken"]});
    }

    await addPost(title, slug, content, isPublished, tags.map(tag => tag.text));

    redirect("/admin/posts");
}