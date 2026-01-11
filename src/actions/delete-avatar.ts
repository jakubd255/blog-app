"use server";

import { updateUser } from "@/db/queries/users";
import { deleteFile, isLocalFile } from "@/lib/file-handler";
import { actionFailure } from "@/lib/action-result";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

export default async function deleteAvatarAction() {
    const {user} = await validateRequest();
    if(!user) {
        return actionFailure();
    }

    if(user.profileImage && isLocalFile(user.profileImage)) {
        deleteFile(user.profileImage);
    }
    await updateUser(user.id, {profileImage: null});

    redirect("/admin/profile");
}