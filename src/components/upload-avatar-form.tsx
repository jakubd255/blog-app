"use client";

import { Button } from "./ui/button";
import { useActionState, useRef } from "react";
import uploadAvatarAction from "@/actions/upload-avatar";

export default function UploadAvatarForm() {
    const [_, action] = useActionState(uploadAvatarAction, undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    return(
        <form action={action} ref={formRef}>
            <Button 
                variant="outline" 
                onClick={() => inputRef.current?.click()} 
                type="button"
            >
                Upload image
            </Button>
            <input
                type="file"
                ref={inputRef}
                name="image"
                onChange={() => formRef.current?.requestSubmit()}
                hidden
            />
        </form>
    );
}