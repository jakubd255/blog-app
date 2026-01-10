"use server";

import { addPost, getPostBySlug, updatePostById } from "@/db/queries/posts";
import { actionFailure } from "@/lib/action-result";
import { Tag } from "emblor";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    id: z.number().nullable().optional(),
    title: z.string().trim().min(1),
    slug: z.string().trim().min(1),
    content: z.string().trim().min(1),
    isPublished: z.coerce.boolean().default(false),
    tags: z.array(z.object({
        id: z.string(),
        text: z.string()
    }))
    .transform((tags) => tags.map(({text}) => text))
});

export default async function upsertPostAction(id: number | null, title: string, slug: string, content: string, isPublished: boolean, tags: Tag[]) {    
    const validationResult = schema.safeParse({id, title, slug, content, isPublished, tags});

    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const post = await getPostBySlug(slug);

    const isSlugTaken = id ? post?.id !== id : !!post;

    if(isSlugTaken) {
        return actionFailure({slug: ["This slug is taken"]});
    }

    //Update post
    if(id) {
        await updatePostById(id, title, slug, content, isPublished, tags.map(tag => tag.text));
    } 
    //Add new post
    else {
        await addPost(title, slug, content, isPublished, tags.map(tag => tag.text));
    }

    redirect("/admin/posts");
}