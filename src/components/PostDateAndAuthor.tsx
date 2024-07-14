import {Post, PostSummary} from "@/types";
import UserAvatar from "./UserAvatar";
import {imageUrl} from "@/util";
import {Link} from "react-router-dom";
import PostDate from "./PostDate";



interface PostDateAndAuthorProps {
    post: Post | PostSummary;
}

const PostDateAndAuthor: React.FC<PostDateAndAuthorProps> = ({post}) => {
    return(
        <div className="flex gap-2 items-center">
            <UserAvatar 
                username={post.user.name} 
                image={imageUrl(post.user.profileImage)}
            />
            <div className="flex flex-col">
                <Link to={"../user/"+post.user.id} className="hover:underline">
                    {post.user.name}
                </Link>
                <PostDate date={post.date}/>
            </div>
        </div>
    );
}

export default PostDateAndAuthor;