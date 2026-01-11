"use server";

import { deletePostById } from "@/db/queries/posts";
import { actionFailure } from "@/lib/action-result";
import { validateRequest } from "@/lib/auth";
import { isAdmin } from "@/lib/auth/permissions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deletePostAction(id: number) {
    const {user} = await validateRequest();
    if(!isAdmin(user)) {
        return actionFailure();
    }

    await deletePostById(id);
    revalidateTag("posts");
    redirect("/admin/posts");
}