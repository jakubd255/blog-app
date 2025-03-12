import UpdateAvatar from "@/components/update-avatar";
import UpdateProfile from "@/components/update-profile";

export default function AdminProfilePage() {
    return(
        <div className="flex flex-col gap-10 p-3 max-w-[700px] w-full mx-auto">
            <UpdateAvatar/>
            <UpdateProfile/>
        </div>
    );
}