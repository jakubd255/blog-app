"use server";

import { validatePassword } from "@/lib/auth/password";
import { updateUser } from "@/db/queries/users";
import { actionFailure } from "@/lib/action-result";
import { redirect } from "next/navigation";
import { z } from "zod";
import { validateRequest } from "@/lib/auth";

const schema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8)
});

export default async function updatePasswordAction(_: unknown, data: FormData) {
    const formData = Object.fromEntries(data.entries());
    
    const validationResult = schema.safeParse(formData);
    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, formData);
    }

    const {currentPassword, newPassword} = validationResult.data;

    const {user} = await validateRequest();
    if(!user) {
        return actionFailure();
    }

    if(!validatePassword(currentPassword, user.password)) {
        return actionFailure({currentPassword: ["Invalid password"]});
    }

    await updateUser(user.id, {password: newPassword});

    redirect("/admin/account");
}