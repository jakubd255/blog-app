"use client";

import UserAvatar from "./user-avatar";
import UploadAvatarForm from "./upload-avatar-form";
import DeleteAvatarForm from "./delete-avatar-form";
import { useSession } from "./providers/session-provider";

export default function UpdateAvatar() {
    const {user} = useSession();
    
    return(
        <div className="flex gap-2 items-center z-1">
            <UserAvatar user={user} size="xl"/>
            <UploadAvatarForm/>
            {user.profileImage && (
                <DeleteAvatarForm/>
            )}
        </div>
    );
}