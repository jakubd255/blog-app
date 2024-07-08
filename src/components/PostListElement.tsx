import {Link} from "react-router-dom";
import PostDate from "./PostDate";
import {PostSummary} from "@/types";



interface PostListElementProps {
    post: PostSummary;
}

const PostListElement: React.FC<PostListElementProps> = ({post}) => {
    return(
        <li className="flex flex-col">
            <Link to={"/posts/"+post.id} className="text-2xl hover:underline">
                {post.title}
            </Link>
            <PostDate date={post.date}/>
        </li>
    )
}

export default PostListElement;