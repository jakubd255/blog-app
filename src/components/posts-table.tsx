import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Post } from "@/lib/types";
import PostsTableActions from "./posts-table-actions";

interface PostTableProps {
    posts: Post[];
}

export default function PostsTable({posts}: PostTableProps) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Id
                    </TableHead>
                    <TableHead>
                        Slug
                    </TableHead>
                    <TableHead>
                        Title
                    </TableHead>
                    <TableHead>
                        Tags
                    </TableHead>
                    <TableHead>
                        Published
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map(post => (
                    <TableRow key={post.id}>
                        <TableCell>
                            {post.id}
                        </TableCell>
                        <TableCell className="!max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                            {post.slug}
                        </TableCell>
                        <TableCell>
                            {post.title}
                        </TableCell>
                        <TableCell className="!max-w-[200px] truncate whitespace-nowrap overflow-hidden flex gap-2">
                            {post.tags?.map(tag => (
                                <span key={post.id+tag}>#{tag}</span>
                            ))}
                        </TableCell>
                        <TableCell>
                            {post.isPublished ? "TRUE" : "FALSE"}
                        </TableCell>
                        <TableCell className="flex gap-1">
                            <PostsTableActions post={post}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}