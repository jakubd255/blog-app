import {User} from "@/types";
import UserAvatar from "./UserAvatar";
import {Link} from "react-router-dom";
import {imageUrl} from "@/util";



interface PostAuthorProps {
    user: User;
}

const PostAuthor: React.FC<PostAuthorProps> = ({user}) => {
    return(
        <div className="flex gap-2 items-center">
            <UserAvatar
                username={user.name}
                image={imageUrl(user.profileImage)}
                size="xs"
            />
            <Link to={"../user/"+user.id} className="hover:underline">
                {user.name}
            </Link>
        </div>
    );
}

export default PostAuthor;