import { type Editor } from "@tiptap/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import { Image } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ImageDialogContent from "./image-dialog-content";

interface ImageDialogProps {
    isActive: boolean;
    editor: Editor;
}

export default function ImageDialog({isActive, editor}: ImageDialogProps) {
    return(
        <Tooltip>
            <TooltipTrigger asChild>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div>
                                <Toggle pressed={isActive}>
                                    <Image className="w-4 h-4"/>
                                </Toggle>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <ImageDialogContent editor={editor}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                Image
            </TooltipContent>
        </Tooltip>
    )
}