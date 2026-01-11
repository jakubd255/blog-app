"use server";

import { validatePassword } from "@/lib/auth/password";
import { updateUser } from "@/db/queries/users";
import { actionFailure } from "@/lib/action-result";
import { redirect } from "next/navigation";
import { z } from "zod";
import { validateRequest } from "@/lib/auth";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export default async function updateEmailAction(_: unknown, data: FormData) {
    const formData = Object.fromEntries(data.entries());

    const validationResult = schema.safeParse(formData);
    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const {email, password} = validationResult.data;

    const {user} = await validateRequest();
    if(!user) {
        return actionFailure();
    }

    if(!validatePassword(password, user.password)) {
        return actionFailure({password: ["Invalid password"]}, {email});
    }

    await updateUser(user.id, {email: email});

    redirect("/admin/account");
}