"use client";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Post } from "@/lib/types";
import deletePostAction from "@/actions/delete-post";
import { useActionState } from "react";

interface PostDeleteDialogProps {
    post: Post;
}

export default function PostDeleteDialogForm({post}: PostDeleteDialogProps) {
    const [_, action] = useActionState(deletePostAction.bind(null, post.id), undefined);
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form className="grid gap-4" action={action}>
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure to delete this post?
                        </DialogTitle>
                    </DialogHeader>
                    {post.title}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" type="submit">
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}