import { Separator } from "@/components/ui/separator";
import UpdateEmailForm from "@/components/update-email-form";
import UpdatePasswordForm from "@/components/update-password-form";

export default function AdminProfilePage() {
    return(
        <div className="flex flex-col gap-10 p-3 max-w-[700px] w-full mx-auto">
            <UpdateEmailForm/>
            <Separator/>
            <UpdatePasswordForm/>
        </div>
    );
}