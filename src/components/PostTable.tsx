import {PostSummary} from "@/types";
import {Table, TableBody} from "./ui/table";
import PostTableHeader from "./PostTableHeader";
import PostTableRow from "./PostTableRow";



interface PostTableProps {
    posts: PostSummary[];
    deletePost: (id: number) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, deletePost }) => {
    return(
        <Table>
            <PostTableHeader/>
            <TableBody>
                {posts.map(post => (
                    <PostTableRow 
                        key={post.id} 
                        post={post} 
                        deletePost={deletePost}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default PostTable;