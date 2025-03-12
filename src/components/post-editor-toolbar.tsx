import { type Editor } from "@tiptap/react";
import { Bold, Code, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Quote, Strikethrough } from "lucide-react";
import { Toggle } from "./ui/toggle";

type PostEditorToolbar = {
    editor: Editor | null;
    content: string;
};

export default function PostEditorToolbar({editor, content}: PostEditorToolbar) {
    if(!editor) {
        return null;
    }
    
    return(
        <div className="flex gap-1 rounded-md border px-3 py-2 sticky top-0 z-10 backdrop-blur-lg">
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleHeading({level: 1}).run();
                }}
                size="sm"
                pressed={editor.isActive("heading", {level: 1})}
            >
                <Heading1 className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleHeading({level: 2}).run();
                }}
                size="sm"
                pressed={editor.isActive("heading", {level: 2})}
            >
                <Heading2 className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleHeading({level: 3}).run();
                }}
                size="sm"
                pressed={editor.isActive("heading", {level: 3})}
            >
                <Heading3 className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleBold().run();
                }}
                size="sm"
                pressed={editor.isActive("bold")}
            >
                <Bold className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleItalic().run();
                }}
                size="sm"
                pressed={editor.isActive("italic")}
            >
                <Italic className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleStrike().run();
                }}
                size="sm"
                pressed={editor.isActive("strike")}
            >
                <Strikethrough className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleBulletList().run();
                }}
                size="sm"
                pressed={editor.isActive("bulletList")}
            >
                <List className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleOrderedList().run();
                }}
                size="sm"
                pressed={editor.isActive("orderedList")}
            >
                <ListOrdered className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().toggleBlockquote().run();
                }}
                size="sm"
                pressed={editor.isActive("blockquote")}
            >
                <Quote className="w-6 h-6"/>
            </Toggle>
            <Toggle 
                onClick={(e) => {
                    e.preventDefault(); 
                    editor.chain().focus().setCode().run();
                }}
                size="sm"
                pressed={editor.isActive("code")}
            >
                <Code className="w-6 h-6"/>
            </Toggle>
        </div>
    );
}