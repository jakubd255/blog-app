import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { type Editor } from "@tiptap/react";

interface TextAlignmentSelectProps {
    editor: Editor;
}

export default function TextAlignmentSelect({editor}: TextAlignmentSelectProps) {
    const alignments = [
        {
            key: "left",
            label: "Left",
            icon: <AlignLeft className="w-4 h-4"/>
        },
        {
            key: "center",
            label: "Center",
            icon: <AlignCenter className="w-4 h-4"/>
        },
        {
            key: "right",
            label: "Right",
            icon: <AlignRight className="w-4 h-4"/>
        },
        {
            key: "justify",
            label: "Justify",
            icon: <AlignJustify className="w-4 h-4"/>
        }
    ]

    const getValue = () => {
        return alignments
            .map(align => align.label.toLowerCase())
            .find(align => editor.isActive({textAlign: align}));
    }
    const value = getValue();

    return(
        <Select 
            value={value} 
            onValueChange={value => editor.chain().focus().setTextAlign(value).run()}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <SelectTrigger className="w-[60px]">
                            {alignments.find(align => align.key === value)?.icon ?? alignments[0].icon}
                        </SelectTrigger>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    Text alignment
                </TooltipContent>
            </Tooltip>
            <SelectContent>
                {alignments.map(align => (
                    <SelectItem value={align.key} key={align.key}>
                        <div className="flex items-center gap-2">
                            {align.icon}
                            {align.label}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}