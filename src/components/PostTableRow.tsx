import {TableCell, TableRow} from "@/components/ui/table";
import {PostSummary} from "@/types";
import PostDate from "./PostDate";
import PostActions from "./PostActions";



interface PostTableRowProps {
    post: PostSummary;
    deletePost: (id: number) => void;
}

const PostTableRow: React.FC<PostTableRowProps> = ({post, deletePost}) => {
    return(
        <TableRow>
            <TableCell>
                {post.title}
            </TableCell>
            <TableCell>
                <PostDate date={post.date}/>
            </TableCell>
            <TableCell>
                {post.status}
            </TableCell>
            <TableCell>
                <PostActions 
                    postId={post.id} 
                    deletePost={deletePost}
                />
            </TableCell>
        </TableRow>
    );
};

export default PostTableRow;