import UpdateAvatar from "@/components/update-avatar";
import UpdateProfileForm from "@/components/update-profile-form";

export default function AdminProfilePage() {
    return(
        <div className="flex flex-col gap-10 p-3 max-w-[800px] w-full mx-auto">
            <UpdateAvatar/>
            <UpdateProfileForm/>
        </div>
    );
}