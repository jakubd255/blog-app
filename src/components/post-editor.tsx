"use client"

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PostEditorToolbar from "./post-editor-toolbar";

interface PostEditorProps {
    text: string;
    onChange: (text: string) => void;
}

export default function PostEditor({text, onChange}: PostEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
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
        <article className="flex flex-col gap-2">
            <PostEditorToolbar editor={editor} content={text}/>
            <EditorContent editor={editor}/>
        </article>
    );
}