import { eq } from "drizzle-orm"
import db from ".."
import { users } from "../schema"
import { User } from "@/lib/types";
import { hashPassword } from "@/lib/auth/password";

export const getAdmin = async () => {
    return await db.query.users.findFirst({
        where: eq(users.role, "ADMIN")
    });
}

export const updateUser = async (id: number, data: Partial<User & {password: string}>) => {
    if(data.password) {
        data.password = hashPassword(data.password);
    }

    await db
        .update(users)
        .set(data)
        .where(eq(users.id, id));
}

export const createAdmin = async () => {
    const email = process.env.ADMIN_EMAIL!;
    const password = hashPassword(process.env.ADMIN_PASSWORD!);

    const res = await db
        .insert(users)
        .values({
            name: "Admin",
            email,
            password,
            role: "ADMIN"
        })
        .returning();
    return res.at(0)!;
}