"use server";

import { getAdmin, updateUser } from "@/lib/db/queries/users";
import { actionFailure } from "@/lib/types/action-result";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    bio: z.string().nullable()
});

export default async function updateProfileAction(name: string, bio: string, links: string[]) {
    const validationResult = schema.safeParse({name, bio});

    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors);
    }

    const user = await getAdmin();
    if(!user) {
        return actionFailure();
    }

    await updateUser(user.id, {name, bio, links});
    
    redirect("/admin/profile");
}
