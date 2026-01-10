"use server";

import { getAdmin, updateUser } from "@/db/queries/users";
import { deleteFile, isLocalFile, uploadFile } from "@/lib/file-handler";
import { actionFailure } from "@/lib/action-result";
import { redirect } from "next/navigation";

export default async function uploadAvatarAction(_: unknown, data: FormData) {
    const image = data.get("image") as File | null;
    if(!image) {
        return actionFailure();
    }

    const user = await getAdmin();
    if(!user) {
        return actionFailure();
    }

    const fileName = await uploadFile(image);
    if(user.profileImage && isLocalFile(user.profileImage)) {
        deleteFile(user.profileImage);
    }

    await updateUser(user.id, {profileImage: fileName});

    redirect("/admin/profile");
}