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
            {/*
            <ToolbarToggle 
                label="Heading 1"
                pressed={editor.isActive("heading", {level: 1})}
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
            >
                <Heading1 className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                label="Heading 2"
                pressed={editor.isActive("heading", {level: 2})}
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
            >
                <Heading2 className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                label="Heading 3"
                pressed={editor.isActive("heading", {level: 3})}
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
            >
                <Heading3 className="w-6 h-6"/>
            </ToolbarToggle>
            */}
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

            {/*
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                pressed={editor.isActive("bulletList")}
                label="Bullet list"
            >
                <List className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                pressed={editor.isActive("orderedList")}
                label="Ordered list"
            >
                <ListOrdered className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                pressed={editor.isActive("taskList")}
                label="Task list"
            >
                <ListTodo className="w-6 h-6"/>
            </ToolbarToggle>
            */}
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

            {/*
            <ToolbarToggle
                onClick={() => {}}
                pressed={false}
                label="Link"
            >
                <Link className="w-6 h-6"/>
            </ToolbarToggle>
            */}
            <LinkPopover 
                isActive={editor.isActive("link")} 
                editor={editor}
            />
            <ImageDialog editor={editor} isActive={editor.isActive("image")}/>
            {/*
            <ToolbarToggle
                onClick={() => {}}
                pressed={false}
                label="Image"
            >
                <Image className="w-6 h-6"/>
            </ToolbarToggle>
            */}
        </div>
    );
}