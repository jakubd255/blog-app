import { Editor } from "@tiptap/react";
import ToolbarToggle from "./toolbar-toggle";
import { Bold, Italic, Strikethrough, Underline, Superscript, Subscript, TextQuote, Code } from "lucide-react";

interface TextMarksProps {
    editor: Editor;
};

export default function TextMarks({editor}: TextMarksProps) {
    return(
        <>
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
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                pressed={editor.isActive("superscript")}
                label="Superscript"
            >
                <Superscript className="w-6 h-6"/>
            </ToolbarToggle>
            <ToolbarToggle 
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                pressed={editor.isActive("subscript")}
                label="Subscript"
            >
                <Subscript className="w-6 h-6"/>
            </ToolbarToggle>
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
        </>
    );
}