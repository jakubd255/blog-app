import { cookies } from "next/headers";
import { cache } from "react";
import { addSession, deleteSession, getSession } from "../../db/queries/sessions";

export const validateRequest = cache(async () => {
    const sessionId = parseInt((await cookies()).get("SESSION_ID")?.value || "0");

    if(!sessionId) {
		return {user: null, session: null};
	}
    const session = await getSession(sessionId);
    if(!session) {
		return {user: null, session: null};
	}

    return {user: session.user, session};
});

export const createSession = async (userId: number) => {
    const session = await addSession(userId);

    const expires = new Date();
    expires.setMonth(expires.getMonth()+1);

    (await cookies()).set({
        name: "SESSION_ID",
        value: session.id.toString(),
        expires,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
}

export const logOut = async () => {
    const sessionId = parseInt((await cookies()).get("SESSION_ID")?.value || "0");
    if(sessionId) {
        await deleteSession(sessionId);
    }
    (await cookies()).delete("SESSION_ID");
}