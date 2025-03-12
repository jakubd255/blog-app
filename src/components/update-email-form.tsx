"use client"

import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSession } from "./providers/session-provider";
import updateEmailAction from "@/actions/update-email";
import FormSubmitError from "./form-submit-error";

export default function UpdateEmailForm() {
    const {user} = useSession();

    const [email, setEmail] = useState<string>(user.email);
    const [password, setPassword] = useState<string>("");

    const [state, action] = useActionState(async () => {
        return await updateEmailAction(email, password);
    }, undefined);

    return(
        <form action={action} className="flex flex-col gap-2">
            <div>
                <Label>
                    Email
                </Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <FormSubmitError errors={state?.errors?.email}/>
            </div>
            <div>
                <Label>
                    Password
                </Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <FormSubmitError errors={state?.errors?.password}/>
            </div>
            <Button>
                Update email
            </Button>
        </form>
    );
}