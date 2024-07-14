import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useAuth} from "@/provider/AuthProvider";
import {useRef, useState} from "react";
import server from "@/constants/server";
import {Camera} from "lucide-react";
import {imageUrl} from "@/util";
import UserAvatar from "./UserAvatar";



const ProfileImageUpdateDialog: React.FC = () => {
    const {user, updateUser} = useAuth();
    const ref = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<File | null>(null);
    const [deleteImage, setDelete] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpdate = () => {
        if(deleteImage) {
            server.delete("/api/users/"+user?.id+"/profile-image").then(() => {
                updateUser({profileImage: null});
            });
        }
        else {
            if(!image) {
                console.log("No file selected");
                return;
            }
            const formData = new FormData();
            formData.append("image", image);

            server.put("/api/users/"+user?.id+"/profile-image", formData).then(response => {
                updateUser({profileImage: response.data});
            });
        }
    }

    const handleChooseImage = () => {
        ref.current && ref.current.click();
        setDelete(false);
    }

    const handleRemoveImage = () => {
        setDelete(true);
        setImage(null);
    }

    const handleOpenChange = (open: boolean) => {
        if(!open) {
            setImage(null);
            setDelete(false);
        }
    }

    if(user) return(
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button
                    variant="outline"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    size="icon"
                >
                    <Camera className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Update profile image
                    </DialogTitle>
                </DialogHeader>
                <UserAvatar 
                    username={user.name} 
                    image={image ? URL.createObjectURL(image) : imageUrl(user.profileImage) as string} 
                    size="lg"
                />
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleChooseImage}>
                        Upload
                    </Button>
                    <Button variant="outline" onClick={handleRemoveImage}>
                        Remove image
                    </Button>
                </div>
                <input 
                    type="file" 
                    accept="image/png, image/gif, image/jpeg"
                    ref={ref} 
                    onChange={handleFileChange} 
                    className="hidden"
                />
                <DialogFooter>
                    <DialogClose>
                        <Button 
                            onClick={handleUpdate} 
                            disabled={!image && !deleteImage}
                        >
                            {deleteImage ? "Delete" : "Update"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ProfileImageUpdateDialog;