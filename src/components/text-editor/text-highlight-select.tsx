import { Editor } from "@tiptap/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PaintBucket } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

export const HIGHLIGHT_COLORS = [
    {name: "Default", value: "default"},
    {name: "Gray", value: "#6b7280"},
    {name: "Red", value: "#ef4444"},
    {name: "Green", value: "#22c55e"},
    {name: "Blue", value: "#3b82f6"},
    {name: "Yellow", value: "#facc15"},
    {name: "Orange", value: "#f97316"},
    {name: "Purple", value: "#a855f7"},
    {name: "Pink", value: "#ec4899"}
];

interface TextHighlightSelectProps {
    editor: Editor;
}

export default function TextHighlightSelect({editor}: TextHighlightSelectProps) {
    const currentHighlight = editor?.getAttributes("highlight").color; 

    const handleSetHighLight = (color: string) => {
        const isDefault = color === currentHighlight || color === "default";
        editor.chain().focus().setHighlight(isDefault ? {color: ""} : {color}).run();
    }

    return(
        <Select 
            value={currentHighlight ? currentHighlight : "default"} 
            onValueChange={handleSetHighLight}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <SelectTrigger className="w-[60px]">
                            <PaintBucket 
                                className="w-4 h-4" 
                                style={{color: currentHighlight}}
                            />
                        </SelectTrigger>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    Text Highlight
                </TooltipContent>
            </Tooltip>
            <SelectContent>
                {HIGHLIGHT_COLORS.map((color, index) => (
                    <SelectItem value={color.value} key={index}>
                        <div className="flex gap-2">
                            <PaintBucket 
                                className="w-4 h-4 mr-2" 
                                style={{color: color.value}}
                            />
                            <span>
                                {color.name}
                            </span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}