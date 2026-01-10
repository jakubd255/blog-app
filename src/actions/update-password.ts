"use server"

import { validatePassword } from "@/lib/auth/password";
import { getAdmin, updateUser } from "@/db/queries/users";
import { actionFailure } from "@/lib/action-result";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8)
});

export default async function updatePasswordAction(currentPassword: string, newPassword: string) {
    const validationResult = schema.safeParse({currentPassword, newPassword});

    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, undefined);
    }

    const user = await getAdmin();
    if(!user) {
        return actionFailure();
    }

    if(!validatePassword(currentPassword, user.password)) {
        return actionFailure({currentPassword: ["Invalid password"]});
    }

    await updateUser(user.id, {password: newPassword});

    redirect("/admin/account");
}