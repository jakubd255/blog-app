"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import deleteAvatarAction from "@/actions/delete-avatar";

export default function DeleteAvatarForm() {
    const [_, action] = useActionState(deleteAvatarAction, undefined);

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Delete image
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete avatar
                    </DialogTitle>
                    <DialogDescription>
                        Your avatar image will be removed.
                    </DialogDescription>
                </DialogHeader>
                <form action={action} id="deleteAvatarForm">
                </form>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" form="deleteAvatarForm">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}