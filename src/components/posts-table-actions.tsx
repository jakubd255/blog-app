import { Post } from "@/lib/types";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import PostDeleteDialogForm from "./post-delete-dialog-form";

interface PostsTableActionsProps {
    post: Post;
}

export default function PostsTableActions({post}: PostsTableActionsProps) {
    return(
        <>
            <Button variant="outline" size="icon" asChild>
                <Link href={`/posts/${post.slug}`}>
                    <Eye className="w-4 h-4"/>
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href={`/admin/posts/editor/${post.id}`}>
                    <Pencil className="w-4 h-4"/>
                </Link>
            </Button>
            <PostDeleteDialogForm post={post}/>
        </>
    );
}