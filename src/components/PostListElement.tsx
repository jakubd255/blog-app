import {Link} from "react-router-dom";
import {PostSummary} from "@/types";
import PostDateAndAuthor from "./PostDateAndAuthor";



interface PostListElementProps {
    post: PostSummary;
}

const PostListElement: React.FC<PostListElementProps> = ({post}) => {
    return(
        <li className="flex flex-col">
            <Link to={"/posts/"+post.id} className="text-2xl hover:underline">
                {post.title}
            </Link>
            <PostDateAndAuthor post={post}/>
        </li>
    )
}

export default PostListElement;