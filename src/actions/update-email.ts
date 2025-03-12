"use server"

import { validatePassword } from "@/lib/auth/password";
import { getAdmin, updateUser } from "@/lib/db/queries/users";
import { actionFailure } from "@/lib/types/action-result";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export default async function updateEmailAction(email: string, password: string) {
    const validationResult = schema.safeParse({email, password});

    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const user = await getAdmin();
    if(!user) {
        return actionFailure();
    }

    if(!validatePassword(password, user.password)) {
        return actionFailure({password: ["Invalid password"]});
    }

    await updateUser(user.id, {email: email});

    redirect("/admin/account");
}