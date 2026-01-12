"use server";

import { updateUser } from "@/db/queries/users";
import { actionFailure } from "@/lib/action-result";
import { validateRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    bio: z.string().nullable(),
    links: z.array(z.string()).nullable().optional()
});

export default async function updateProfileAction(name: string, bio: string, links: string[]) {
    const validationResult = schema.safeParse({name, bio, links});
    
    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors);
    }

    const {user} = await validateRequest();
    if(!user) {
        return actionFailure();
    }

    await updateUser(user.id, {name, bio, links});
    revalidatePath("/about");
}
