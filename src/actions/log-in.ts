"use server"

import { createSession } from "@/lib/auth";
import { validatePassword } from "@/lib/auth/password";
import { createAdmin, getAdmin } from "@/lib/db/queries/users";
import { actionFailure } from "@/lib/types/action-result";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string()
});

const checkAdmin = async () => {
    const admin = await getAdmin();
    if(!admin) {
        const newAdmin = await createAdmin();
        console.log("Admin has been created");
        return newAdmin;
    }
    else {
        console.log("Admin already exists");
    }
    return admin;
}

export default async function logInAction(_: unknown, data: FormData) {
    const formData = Object.fromEntries(data.entries());

    const validationResult = schema.safeParse(formData);
    if(!validationResult.success) {
        return actionFailure(validationResult.error?.flatten().fieldErrors, formData);
    }

    const {email, password} = validationResult.data;

    const admin = await checkAdmin();
    if(admin.email !== email || !validatePassword(password, admin.password)) {
        return actionFailure();
    }

    await createSession(admin.id);

    redirect("/admin");
}