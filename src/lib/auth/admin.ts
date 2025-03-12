"use server"

import { createAdmin, getAdmin } from "../db/queries/users";

export const initAdmin = async () => {
    console.log("Admin check");
    const admin = await getAdmin();
    if(!admin) {
        await createAdmin();
        console.log("Admin has beeb created");
    }
}