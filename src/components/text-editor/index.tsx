"use client";

import { TooltipProvider } from "../ui/tooltip";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToolbar from "./text-editor-toolbar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { FigureImage } from "./figure-image";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Figure } from "./figure";
import { Figcaption } from "./figcaption";

interface TextEditorProps {
    text: string;
    onChange: (text: string) => void;
}

export default function TextEditor({text, onChange}: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline, 
            Superscript,
            Subscript,
            TextAlign.configure({
                types: ["heading", "paragraph", "image"],
                defaultAlignment: "left"
            }),
            Link,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            FigureImage, Figure, Figcaption,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            })
        ],
        immediatelyRender: false,
        content: text,
        editorProps: {
            attributes: {
                class: "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-0"
            }
        },
        onUpdate: ({editor}) => {
            onChange(editor.getHTML());
        }
    });

    return(
        <TooltipProvider>
            <article className="flex flex-col gap-2">
                <TextEditorToolbar editor={editor} content={text}/>
                <EditorContent editor={editor}/>
            </article>
        </TooltipProvider>
    );
}