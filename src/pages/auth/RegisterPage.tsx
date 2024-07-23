import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import server from "@/constants/server";
import {useNavigate} from "react-router-dom";
import AuthPageLink from "@/components/AuthPageLink";
import {APP_NAME} from "@/constants";



const RegisterPage: React.FC = () => {
    document.title = "Register to "+APP_NAME;

    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(2, {message: "Name must be 2 or more characters long"}),
        email: z.string().email(),
        password: z.string().min(8, {message: "Password must be 8 or more characters long"})
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        server.post("/api/auth/register", data).then(() => {
            navigate("/");
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
            <form className="flex flex-col gap-5 w-[400px]" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-2">
                    <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="!mt-0" autoComplete="off"/>
                            </FormControl>
                            <FormMessage className="!mt-0"/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                E-mail
                            </FormLabel>
                            <FormControl>
                                <Input type="email" {...field} className="!mt-0" autoComplete="off"/>
                            </FormControl>
                            <FormMessage className="!mt-0"/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input type="password" {...field} className="!mt-0" autoComplete="off"/>
                            </FormControl>
                            <FormMessage className="!mt-0"/>
                        </FormItem>
                    )}/>
                </div>
                <Button className="w-full">
                    <LogIn className="mr-2 h-4 w-4"/>
                    Register
                </Button>
                <AuthPageLink 
                    link="/log-in" 
                    text="Have an account?" 
                    type="Log in"
                />
            </form>
        </Form>
    );
}

export default RegisterPage;