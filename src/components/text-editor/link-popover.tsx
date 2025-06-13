"use client"

import { Link } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { type Editor } from "@tiptap/react";
import LinkPopoverContent from "./link-popover-content";

interface LinkPopoverProps {
    isActive: boolean;
    editor: Editor;
}

export default function LinkPopover({isActive, editor}: LinkPopoverProps) {
    return(
        <Tooltip>
            <TooltipTrigger asChild>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div>
                                <Toggle pressed={isActive}>
                                    <Link className="w-4 h-4"/>
                                </Toggle>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px]">
                            <LinkPopoverContent editor={editor}/>
                        </PopoverContent>
                    </Popover>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                Link
            </TooltipContent>
        </Tooltip>
    );
}