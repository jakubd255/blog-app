"use client";

import useButtonRef from "@/lib/hooks/useButtonRef";
import useFormRef from "@/lib/hooks/useFormRef";
import { Button } from "./ui/button";
import { useActionState } from "react";
import uploadAvatarAction from "@/actions/upload-avatar";

export default function UploadAvatarForm() {
    const [_, action] = useActionState(uploadAvatarAction, undefined);

    const buttonRef = useButtonRef();
    const formRef = useFormRef();

    return(
        <form action={action} ref={formRef.ref}>
            <Button variant="outline" onClick={buttonRef.click} type="button">
                Upload image
            </Button>
            <input type="file" ref={buttonRef.ref} name="image" onChange={formRef.submit} hidden/>
        </form>
    );
}