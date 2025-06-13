import { type Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

interface LinkPopoverContentProps {
    editor: Editor;
}

export default function LinkPopoverContent({editor}: LinkPopoverContentProps) {
    const [url, setUrl] = useState<string>(editor.getAttributes("link").href);

    const setLink = () => {
        //If empty
        if(!url) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({href: url}).run();
    }

    return(
        <div className="flex flex-col gap-2">
            <div>
                <Label>
                    URL
                </Label>
                <Input 
                    type="url" 
                    placeholder="Enter URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
            </div>
            <div className="text-right">
                <Button type="button" onClick={setLink}>
                    Confirm
                </Button>
            </div>
        </div>
    );
}