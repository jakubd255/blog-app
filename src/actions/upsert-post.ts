"use server";

import { addPost, getPostBySlug, updatePostById } from "@/db/queries/posts";
import { actionFailure } from "@/lib/action-result";
import { validateRequest } from "@/lib/auth";
import { isAdmin } from "@/lib/auth/permissions";
import { Tag } from "emblor";
import { revalidateTag } from "next/cache";
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
    const {user} = await validateRequest();
    if(!isAdmin(user)) {
        return actionFailure();
    }

    const validationResult = schema.safeParse({id, title, slug, content, isPublished, tags});
    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const post = await getPostBySlug(slug);

    const isSlugTaken = id ? post?.id !== id : !!post;
    if(isSlugTaken) {
        return actionFailure({slug: ["This slug is taken"]});
    }

    if(id) {
        await updatePostById(id, title, slug, content, isPublished, tags.map(tag => tag.text));
    } 
    else {
        await addPost(title, slug, content, isPublished, tags.map(tag => tag.text));
    }

    revalidateTag("posts");
    redirect("/admin/posts");
}