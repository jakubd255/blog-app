"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import updatePasswordAction from "@/actions/update-password";
import FormSubmitError from "./form-submit-error";

export default function UpdatePasswordForm() {
    const [state, action] = useActionState(updatePasswordAction, undefined);

    return(
        <form action={action} className="flex flex-col gap-2">
            <div>
                <Label>
                    Current password
                </Label>
                <Input type="password" name="currentPassword"/>
                <FormSubmitError errors={state?.errors?.currentPassword}/>
            </div>
            <div>
                <Label>
                    New password
                </Label>
                <Input type="password" name="newPassword"/>
                <FormSubmitError errors={state?.errors?.newPassword}/>
            </div>
            <Button type="submit">
                Update password
            </Button>
        </form>
    );
}