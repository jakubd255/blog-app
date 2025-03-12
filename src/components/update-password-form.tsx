"use client"

import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import updatePasswordAction from "@/actions/update-password";
import FormSubmitError from "./form-submit-error";

export default function UpdatePasswordForm() {
    const [currentPassword, setCurrent] = useState<string>("");
    const [newPassword, setNew] = useState<string>("");

    const [state, action] = useActionState(async () => {
        return await updatePasswordAction(currentPassword, newPassword);
    }, undefined);

    return(
        <form action={action} className="flex flex-col gap-2">
            <div>
                <Label>
                    Current password
                </Label>
                <Input type="password" value={currentPassword} onChange={e => setCurrent(e.target.value)}/>
                <FormSubmitError errors={state?.errors?.currentPassword}/>
            </div>
            <div>
                <Label>
                    New password
                </Label>
                <Input type="password" value={newPassword} onChange={e => setNew(e.target.value)}/>
                <FormSubmitError errors={state?.errors?.newPassword}/>
            </div>
            <Button>
                Update password
            </Button>
        </form>
    );
}