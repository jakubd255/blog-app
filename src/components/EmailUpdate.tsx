import {Input} from "@/components/ui/input.tsx";
import {useAuth} from "@/provider/AuthProvider.tsx";
import {Button} from "@/components/ui/button.tsx";
import server from "@/constants/server.ts";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";



const EmailUpdate: React.FC = () => {
    const {user, updateUser} = useAuth();

    const formSchema = z.object({
        email: z.string().email(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user?.email,
        }
    });

    let isEmailModified = form.watch("email") !== user?.email;

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        server.put("/api/auth/email", {email: data.email}).then(() => {
            updateUser({email: data.email});
            isEmailModified = false;
        })
        .catch(error => {
            console.error(error);
            if(error.response.status === 409) {
                form.setError("email", {message: "This e-mail is taken"});
            }
        });
    }

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="flex flex-col gap-2"
            >
                <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            E-mail
                        </FormLabel>
                        <FormControl>
                            <Input type="email" {...field} className="!mt-0" autoComplete="new-password"/>
                        </FormControl>
                        <FormMessage className="!mt-0"/>
                    </FormItem>
                )}/>
                <Button disabled={!isEmailModified}>
                    Update
                </Button>
            </form>
        </Form>
    );
}

export default EmailUpdate;