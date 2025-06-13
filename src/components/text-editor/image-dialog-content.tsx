import { type Editor } from "@tiptap/react";
import { DialogClose, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import useButtonRef from "@/lib/hooks/useButtonRef";

interface ImageDialogContentProps {
    editor: Editor;
}

export default function ImageDialogContent({editor} : ImageDialogContentProps) {
    const [url, setUrl] = useState<string>("");
    const {ref, click} = useButtonRef();

    const setImageFromUrl = () => {
        if(url) {
            editor.chain().focus().setImage({src: url}).run();
            click();
        }
    }

    const setImageFromDevice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if(reader.result) {
                    editor.chain().focus().setImage({src: reader.result as string}).run()
                }
            };
            reader.readAsDataURL(file);
            click();
        }
    }

    return(
        <>
            <DialogHeader>
                <DialogTitle>
                    Select image
                </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
                <div>
                    <Label>
                        Image URL
                    </Label>
                    <div className="flex gap-2">
                        <Input 
                            type="url" 
                            placeholder="Enter image URL" 
                            value={url} 
                            onChange={e => setUrl(e.target.value)}
                        />
                        
                            <Button onClick={setImageFromUrl} type="button">
                                Submit
                            </Button>
                        
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Separator className="flex-1"/>
                    <span className="text-muted-foreground">
                        OR
                    </span>
                    <Separator className="flex-1"/>
                </div>
                <label htmlFor="upload" className="w-max">
                    <Button asChild>
                        <span className="cursor-pointer">
                            Upload from your device 
                        </span>
                    </Button>
                </label>
                <input 
                    type="file" 
                    id="upload"
                    accept=".jpeg, .png, .jpgm .gif"
                    onChange={setImageFromDevice} 
                    hidden
                />
            </div>
            <div className="hidden">
                <DialogClose ref={ref}></DialogClose>
            </div>
        </>
    );
}