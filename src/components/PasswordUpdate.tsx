import React from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import server from "@/constants/server.ts";



const PasswordUpdate: React.FC = () => {
    const formSchema = z.object({
        oldPassword: z.string().min(8, {message: "Password must be 8 or more characters long"}),
        newPassword: z.string().min(8, {message: "Password must be 8 or more characters long"}),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        server.put("/api/auth/password", {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        })
        .catch(error => {
            if(error.response.status === 401) {
                form.setError("oldPassword", {message: "Invalid password"});
                form.setValue("oldPassword", "");
                form.setValue("newPassword", "");
            }
        });
    }

    const isDisabled = !(form.getValues().oldPassword && form.getValues().newPassword);

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="flex flex-col gap-2"
            >
                <h3>
                    Password Update
                </h3>
                <FormField control={form.control} name="oldPassword" render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Current password
                        </FormLabel>
                        <FormControl>
                            <Input type="password" {...field} className="!mt-0"/>
                        </FormControl>
                        <FormMessage className="!mt-0"/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="newPassword" render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            New password
                        </FormLabel>
                        <FormControl>
                            <Input type="password" {...field} className="!mt-0"/>
                        </FormControl>
                        <FormMessage className="!mt-0"/>
                    </FormItem>
                )}/>
                <Button disabled={isDisabled}>
                    Update
                </Button>
            </form>
        </Form>
    );
}

export default PasswordUpdate;