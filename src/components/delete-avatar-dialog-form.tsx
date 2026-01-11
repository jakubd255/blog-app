"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import deleteAvatarAction from "@/actions/delete-avatar";

export default function DeleteAvatarDialogForm() {
    const [_, action] = useActionState(deleteAvatarAction, undefined);

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Delete image
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form className="grid gap-4" action={action}>
                    <DialogHeader>
                        <DialogTitle>
                            Delete avatar
                        </DialogTitle>
                        <DialogDescription>
                            Your avatar image will be removed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
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