import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolbarToggleProps {
    onClick: () => void;
    pressed: boolean;
    label: string;
}

export default function ToolbarToggle({children, onClick, pressed, label}: React.PropsWithChildren<ToolbarToggleProps>) {
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