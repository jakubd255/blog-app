import ProfileImageUpdateDialog from "@/components/ProfileImageUpdateDialog.tsx";
import {useAuth} from "@/provider/AuthProvider.tsx";
import UserAvatar from "./UserAvatar";
import {imageUrl} from "@/util";



const ProfileImageUpdate: React.FC = () => {
    const {user} = useAuth();

    if(user) return(
        <div>
            <div className="relative w-[150px] h-[150px]">
                <UserAvatar 
                    username={user.name} 
                    image={imageUrl(user.profileImage)} 
                    size="lg"
                />
                <ProfileImageUpdateDialog/>
            </div>
        </div>
    );
}

export default ProfileImageUpdate;