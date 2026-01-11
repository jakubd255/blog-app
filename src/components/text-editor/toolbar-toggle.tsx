import { ReactNode } from "react";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolbarToggleProps {
    children: ReactNode;
    onClick: () => void;
    pressed: boolean;
    label: string;
}

export default function ToolbarToggle({children, onClick, pressed, label}: ToolbarToggleProps) {
    return(
        <Tooltip>
            <TooltipTrigger asChild>
                <div>
                    <Toggle 
                        onClick={(e) => {
                            e.preventDefault(); 
                            onClick();
                        }}
                        pressed={pressed}
                    >
                        {children}
                    </Toggle>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {label}
            </TooltipContent>
        </Tooltip>
    );
}