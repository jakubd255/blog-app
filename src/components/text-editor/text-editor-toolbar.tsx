import { type Editor } from "@tiptap/react";
import { Separator } from "../ui/separator";
import LinkPopover from "./link-popover";
import TextAlignmentSelect from "./text-alignment-select";
import TextStyleSelect from "./text-style-select";
import ListSelect from "./list-select";
import ImageDialog from "./image-dialog";
import TextMarks from "./text-marks";
import TextColorSelect from "./text-color-select";
import TextHighlightSelect from "./text-highlight-select";

interface TextEditorToolbarProps {
    editor: Editor | null;
    content: string;
};

export default function TextEditorToolbar({editor}: TextEditorToolbarProps) {
    if(!editor) {
        return null;
    }
        
    return(
        <div className="flex gap-1 flex-wrap rounded-md border px-3 py-2 sticky top-0 z-10 bg-background !bg-opacity-25 !backdrop-blur-lg">
            <TextStyleSelect editor={editor}/>
            <Separator orientation="vertical"/>
            <TextMarks editor={editor}/>
            <Separator orientation="vertical"/>
            <TextAlignmentSelect editor={editor}/>
            <Separator orientation="vertical"/>
            <ListSelect editor={editor}/>
            <Separator orientation="vertical"/>        
            <TextColorSelect editor={editor}/>
            <TextHighlightSelect editor={editor}/>
            <Separator orientation="vertical"/>
            <LinkPopover editor={editor} isActive={editor.isActive("link")}/>
            <ImageDialog editor={editor} isActive={editor.isActive("image")}/>
        </div>
    );
}