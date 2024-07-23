import {Link} from "react-router-dom";
import {PostSummary} from "@/types";
import PostAuthor from "./PostAuthor";
import PostDate from "./PostDate";
import {Separator} from "./ui/separator";



interface PostListElementProps {
    post: PostSummary;
}

const PostListElement: React.FC<PostListElementProps> = ({post}) => {
    return(
        <li className="flex flex-col gap-2">
            <Link to={"/posts/"+post.id} className="flex flex-col">
                <h3 className="text-[24px] font-semibold">
                    {post.title}
                </h3>
                <PostAuthor user={post.user}/>
                <PostDate date={post.date}/>
            </Link>
            <Separator/>
        </li>
    );
}

export default PostListElement;