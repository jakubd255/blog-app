import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";



type Size = "xs" | "sm" | "md" | "lg";

interface UserAvatarProps {
    username: string;
    image: string | undefined;
    size?: Size;
}

const UserAvatar: React.FC<UserAvatarProps> = ({username, image, size="sm"}) => {
    const getSize = () => {
        switch(size) {
            case "xs": return "w-[20px] h-[20px]";
            case "sm": return "";
            case "md": return "w-[100px] h-[100px]";
            case "lg": return "w-[150px] h-[150px]";
        }
    }

    const getTextSize = () => {
        switch(size) {
            case "xs": return "";
            case "sm": return "";
            case "md": return "text-5xl";
            case "lg": return "text-9xl";
        }
    }

    return(
        <Avatar className={getSize()}>
            {image ? (
                <AvatarImage src={image} className="object-cover"/>
            ) : null}
            <AvatarFallback className={getTextSize()}>
                {username.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;