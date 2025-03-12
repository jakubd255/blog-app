"use client"

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction } from "react";

interface UpdateLinksFormProps {
    links: string[];
    onChange: Dispatch<SetStateAction<string[]>>;
}

export default function UpdateLinksForm({links, onChange}: UpdateLinksFormProps) {
    const handleAddLink = () => {
        onChange(links => [...links, ""]);
    };
    const handleRemoveLink = (i: number) => {
        onChange(links => links.filter((_, index: number) => index !== i));
    };
    const handleUpdateLink = (e: any) => {
        onChange(links => links.map((link: string, index: number) => (index === parseInt(e.target.name) ? e.target.value : link)));
    }

    return(
        <div className="flex flex-col gap-1">
            {links?.map((link: string, index: number) =>
                <div className="flex gap-1" key={index}>
                    <Input
                        name={index.toString()}
                        onChange={handleUpdateLink}
                        value={link}
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => handleRemoveLink(index)}
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            <Button
                variant="outline"
                className="w-min"
                type="button"
                onClick={handleAddLink}
            >
                Add link
            </Button>
        </div>
    );
}