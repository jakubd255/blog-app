import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deletePostById } from "@/lib/db/queries/posts";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Post } from "@/lib/types";

interface PostDeleteDialogProps {
    post: Post;
}

export default function PostDeleteDialog({post}: PostDeleteDialogProps) {
    const handleDeletePost = async () => {
        "use server"
        await deletePostById(post.id);
        redirect("/admin/posts");
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure to delete this post?
                    </DialogTitle>
                </DialogHeader>
                {post.title}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDeletePost}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}