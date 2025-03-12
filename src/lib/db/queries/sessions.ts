import { eq } from "drizzle-orm";
import db from ".."
import { sessions } from "../schema"

export const addSession = async (userId: number) => {
    const expiresAt =  new Date();
    expiresAt.setMonth(expiresAt.getMonth()+1);

    const res = await db
        .insert(sessions)
        .values({userId, expiresAt})
        .returning();
    return res.at(0)!;
}

export const getSession = async (id: number) => {
    const session = await db.query.sessions.findFirst({
        where: eq(sessions.id, id),
        with: {user: true}
    });
    if(!session || session.expiresAt < new Date()) {
        return undefined;
    }
    return session;
}

export const deleteSession = async (id: number) => {
    await db
        .delete(sessions)
        .where(eq(sessions.id, id));
}