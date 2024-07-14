import PostTableHeader from "./PostTableHeader";
import PostTableRow from "./PostTableRow";
import {Table, TableBody} from "@/components/ui/table";
import {usePosts} from "@/provider/PostsProvider";



interface PostTableProps {
    showAuthor?: boolean;
}

const PostTable: React.FC<PostTableProps> = ({showAuthor=false}) => {
    const {posts} = usePosts();

    return(
        <>
            <h2>
                Posts
            </h2>
            <Table>
                <PostTableHeader showAuthor={showAuthor}/>
                <TableBody>
                    {posts.map(post => (
                        <PostTableRow 
                            key={post.id} 
                            post={post} 
                            showAuthor={showAuthor}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default PostTable;