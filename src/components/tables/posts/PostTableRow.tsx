import {TableCell, TableRow} from "@/components/ui/table";
import {PostSummary} from "@/types";
import PostDate from "@/components/PostDate";
import PostActions from "./PostActions";
import UserAvatar from "@/components/UserAvatar";
import {imageUrl} from "@/util";
import {Link} from "react-router-dom";



interface PostTableRowProps {
    post: PostSummary;
    showAuthor?: boolean;
}

const PostTableRow: React.FC<PostTableRowProps> = ({post, showAuthor=false}) => {
    return(
        <TableRow>
            <TableCell>
                <Link to={"../../posts/"+post.id} className="hover:underline">
                    {post.title}
                </Link>
            </TableCell>
            <TableCell>
                <PostDate date={post.date}/>
            </TableCell>
            <TableCell>
                {post.status}
            </TableCell>
            {showAuthor ? (
                <TableCell>
                    <div className="">
                        <UserAvatar 
                            username={post.user.name} 
                            image={imageUrl(post.user.profileImage)}
                        />
                        <Link to={"../../user/"+post.user.id} className="hover:underline">
                            {post.user.name}
                        </Link>
                    </div>
                </TableCell>
            ) : null}
            <TableCell>
                <PostActions postId={post.id}/>
            </TableCell>
        </TableRow>
    );
};

export default PostTableRow;