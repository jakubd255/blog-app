import { Editor } from "@tiptap/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Baseline } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "../ui/select";
import { SelectGroup } from "@radix-ui/react-select";

export const TEXT_COLORS = [
    {name: "Default", value: "default"},
    {name: "Gray", value: "#6b7280"},
    {name: "Red", value: "#ef4444"},
    {name: "Green", value: "#22c55e"},
    {name: "Blue", value: "#3b82f6"},
    {name: "Yellow", value: "#eab308"},
    {name: "Orange", value: "#f97316"},
    {name: "Purple", value: "#a855f7"},
    {name: "Pink", value: "#ec4899"}
];

interface TextColorSelectProps {
    editor: Editor;
}

export default function TextColorSelect({editor}: TextColorSelectProps) {
    const currentColor = editor?.getAttributes("textStyle").color;

    const handleSetColor = (color: string) => {
        const isDefault = color === currentColor || color === "default";
        editor.chain().focus().setColor(isDefault ? "" : color).run();
    }

    return(
        <Select 
            value={currentColor ? currentColor : "default"} 
            onValueChange={handleSetColor}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <SelectTrigger className="w-[60px]">
                            <Baseline 
                                className="w-4 h-4" 
                                style={{color: currentColor}}
                            />
                        </SelectTrigger>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    Text color
                </TooltipContent>
            </Tooltip>
            <SelectContent>
                {TEXT_COLORS.map((color, index) => (
                    <SelectItem value={color.value} key={index}>
                        <div className="flex gap-2">
                            <Baseline 
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