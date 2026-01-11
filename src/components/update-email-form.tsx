"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSession } from "./providers/session-provider";
import updateEmailAction from "@/actions/update-email";
import FormSubmitError from "./form-submit-error";

export default function UpdateEmailForm() {
    const {user} = useSession();
    const [state, action] = useActionState(updateEmailAction, {email: user.email});

    return(
        <form action={action} className="flex flex-col gap-2">
            <div>
                <Label>
                    Email
                </Label>
                <Input type="email" name="email" defaultValue={state?.email}/>
                <FormSubmitError errors={state?.errors?.email}/>
            </div>
            <div>
                <Label>
                    Password
                </Label>
                <Input type="password" name="password"/>
                <FormSubmitError errors={state?.errors?.password}/>
            </div>
            <Button type="submit">
                Update email
            </Button>
        </form>
    );
}