"use client";

import { useSession } from "./providers/session-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import updateProfileAction from "@/actions/update-profile";
import PostEditor from "./text-editor";
import LinksInput from "./links-input";

export default function UpdateProfileForm() {
    const {user} = useSession();
    const [name, setName] = useState<string>(user.name);
    const [bio, setBio] = useState<string>(user.bio || "");
    const [links, setLinks] = useState<string[]>(user.links || []);

    const [_, action] = useActionState(async () => {
        return await updateProfileAction(name, bio, links);
    }, undefined);

    return(
        <form action={action} className="flex flex-col gap-5">
            <div>
                <Label>
                    Name
                </Label>
                <Input value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <Label>
                    Bio
                </Label>
                <PostEditor text={bio} onChange={setBio}/>
            </div>
            <div>
                <Label>
                    Links
                </Label>
                <LinksInput links={links} onChange={setLinks}/>
            </div>
            <div>
                <Button type="submit">
                    Update
                </Button>
            </div>
        </form>
    );
}