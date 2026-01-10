import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Post } from "@/lib/types";
import deletePostAction from "@/actions/delete-post";

interface PostDeleteDialogProps {
    post: Post;
}

export default function PostDeleteDialog({post}: PostDeleteDialogProps) {
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
                    <Button 
                        variant="destructive" 
                        onClick={deletePostAction.bind(null, post.id)}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}