import LoginForm from "@/components/login-form";

export default async function AdminAuthPage() {
    return(
        <div className="w-full max-w-[500px] mx-auto mt-[100px]">
            <LoginForm/>
        </div>
    );
}