import {Input} from "@/components/ui/input.tsx";
import {useAuth} from "@/provider/AuthProvider.tsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import server from "@/constants/server.ts";
import {Textarea} from "./ui/textarea";



const NameBioUpdate: React.FC = () => {
    const {user, updateUser} = useAuth();

    const formSchema = z.object({
        name: z.string().min(2, {message: "Name must be 2 or more characters long"}),
        bio: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name,
            bio: user?.bio,
        }
    });

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        const update = {
            name: data.name, 
            bio: data.bio
        }
        server.put("/api/users/"+user?.id, update).then(() => {
            updateUser(update);
        });
    }

    const isDisabled = !(form.getValues().name !== user?.name || form.getValues().bio !== user?.bio);

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="flex flex-col gap-2"
            >
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="!mt-0"/>
                        </FormControl>
                        <FormMessage className="!mt-0"/>
                    </FormItem>
                )}/>
                {user?.role !== "ROLE_USER" ? (
                    <FormField control={form.control} name="bio" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea {...field} className="!mt-0"/>
                            </FormControl>
                        </FormItem>
                    )}/>
                ) : null}
                <Button disabled={isDisabled}>
                    Update
                </Button>
            </form>
        </Form>
    );
}

export default NameBioUpdate;