"use server"

import { logOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function logOutAction() {
    await logOut();
    redirect("/");
}