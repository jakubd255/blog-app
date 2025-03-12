"use server";

import { getAdmin, updateUser } from "@/lib/db/queries/users";
import { deleteFile, isLocalFile } from "@/lib/file-handler";
import { actionFailure } from "@/lib/types/action-result";
import { redirect } from "next/navigation";

export default async function deleteAvatarAction() {
    const user = await getAdmin();
    if(!user) {
        return actionFailure();
    }

    if(user.profileImage && isLocalFile(user.profileImage)) {
        deleteFile(user.profileImage);
    }
    await updateUser(user.id, {profileImage: null});

    //return actionSuccess();
    redirect("/admin/profile");
}
