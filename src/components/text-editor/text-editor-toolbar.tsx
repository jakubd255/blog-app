/* eslint-disable jsx-a11y/alt-text */

import { type Editor } from "@tiptap/react";
import { Bold, Code, Image, Italic, Strikethrough, TextQuote, Underline } from "lucide-react";
import ToolbarToggle from "./toolbar-toggle";
import { Separator } from "../ui/separator";
import LinkPopover from "./link-popover";
import TextAlignmentSelect from "./text-alignment-select";
import TextStyleSelect from "./text-style-select";
import ListSelect from "./list-select";
import ImageDialog from "./image-dialog";

interface TextEditorToolbarProps {
    editor: Editor | null;
    content: string;
};

export default function TextEditorToolbar({editor}: TextEditorToolbarProps) {
    if(!editor) {
        return null;
    }
        
    return(
        <div className="flex gap-1 rounded-md border px-3 py-2 sticky top-0 z-10 bg-background !bg-opacity-25 !backdrop-blur-lg">
            <TextStyleSelect editor={editor}/>

            <Separator orientation="vertical"/>

            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleBold().run()}
                pressed={editor.isActive("bold")}
                label="Bold"
            >
                <Bold className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleItalic().run()}
                pressed={editor.isActive("italic")}
                label="Italic"
            >
                <Italic className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleStrike().run()}
                pressed={editor.isActive("strike")}
                label="Strike"
            >
                <Strikethrough className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                pressed={editor.isActive("underline")}
                label="Underline"
            >
                <Underline className="w-6 h-6"/>
            </ToolbarToggle>

            <Separator orientation="vertical"/>

            <TextAlignmentSelect editor={editor}/>
            
            <Separator orientation="vertical"/>

            <ListSelect editor={editor}/>

            <Separator orientation="vertical"/>

            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                pressed={editor.isActive("blockquote")}
                label="Block quote"
            >
                <TextQuote className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleCode().run()}
                pressed={editor.isActive("code")}
                label="Code"
            >
                <Code className="w-6 h-6"/>
            </ToolbarToggle>

            <Separator orientation="vertical"/>

            <LinkPopover 
                isActive={editor.isActive("link")} 
                editor={editor}
            />
            <ImageDialog editor={editor} isActive={editor.isActive("image")}/>
        </div>
    );
}