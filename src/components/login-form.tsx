"use client";

import { useActionState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import logInAction from "@/actions/log-in";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function LoginForm() {
    const [state, action] = useActionState(logInAction, undefined);
    
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    Log in
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4" action={action}>
                    <div className="flex flex-col gap-2">
                        <div>
                            <Label htmlFor="email">
                                E-mail
                            </Label>
                            <Input type="email" name="email"/>
                        </div>
                        <div>
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input type="password" name="password"/>
                        </div>
                    </div>
                    <Button type="submit">
                        <LogIn className="mr-2"/>
                        Log in
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}