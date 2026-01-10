import { type Editor } from "@tiptap/react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Heading1, Heading2, Heading3, Type } from "lucide-react";

interface TextStyleSelectProps {
    editor: Editor;
}

export default function TextStyleSelect({editor}: TextStyleSelectProps) {
    const getValue = () => {
        if(editor.isActive("heading", {level: 1}))
            return "h1";
        else if(editor.isActive("heading", {level: 2})) 
            return "h2";
        else if(editor.isActive("heading", {level: 3}))
            return "h3";
        else if(editor.isActive("paragraph"))
            return "p";
    }

    const onValueChange = (value: string) => {
        switch(value) {
            case "p": editor.chain().focus().setParagraph().run(); break;
            case "h1": editor.chain().focus().toggleHeading({level: 1}).run(); break;
            case "h2": editor.chain().focus().toggleHeading({level: 2}).run(); break;
            case "h3": editor.chain().focus().toggleHeading({level: 3}).run(); break;
        }
    }

    const value = getValue();

    return(
        <Select value={value} onValueChange={onValueChange}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <SelectTrigger className="w-[60px]">
                            {value === "h1" ? (
                                <Heading1 className="w-5 h-5"/>
                            ) : value === "h2" ? (
                                <Heading2 className="w-5 h-5"/>
                            ) : value === "h3" ? (
                                <Heading3 className="w-5 h-5"/>
                            ) : (
                                <Type className="w-3 h-3"/>
                            )}
                        </SelectTrigger>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    Text style
                </TooltipContent>
            </Tooltip>
            <SelectContent>
                <SelectItem value="p">
                    Normal text
                </SelectItem>
                <SelectItem value="h1">
                    <h1>
                        Heading 1
                    </h1>
                </SelectItem>
                <SelectItem value="h2">
                    <h2>
                        Heading 2
                    </h2>
                </SelectItem>
                <SelectItem value="h3">
                    <h3>
                        Heading 3
                    </h3>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}