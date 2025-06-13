"use client"

import addPostAction from "@/actions/add-post";
import { useActionState, useState } from "react";
import getSlug from "speakingurl";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import TextEditor from "./text-editor";
import updatePostAction from "@/actions/update-post";
import FormSubmitError from "./form-submit-error";
import { Switch } from "./ui/switch";
import { Tag, TagInput } from "emblor";

interface PostFormProps {
    title: string;
    slug: string;
    content: string;
    mode: string;
    isPublished: boolean;
    tags: Tag[];
    id?: number;
}

export default function PostForm(props: PostFormProps) {
    const [title, setTitle] = useState<string>(props.title);
    const [slug, setSlug] = useState<string>(props.slug);
    const [content, setContent] = useState<string>(props.content);
    const [isPublished, setPublished] = useState<boolean>(props.isPublished);
    const [tags, setTags] = useState<Tag[]>(props.tags);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const handleSetSlug = () => setSlug(getSlug(title));

    const handleKeyDown = (event: any) => {
        if(event.key === "Enter") event.preventDefault();
    };

    const [state, action, pending] = useActionState(async () => {
        if(props.mode === "EDIT" && props.id) {
            return await updatePostAction(props.id, title, slug, content, isPublished, tags);
        }
        else {
            return await addPostAction(title, slug, content, isPublished, tags);
        }
    }, undefined);

    return(
        <form 
            action={action} 
            className="flex flex-col gap-5 p-3 max-w-[800px] w-full mx-auto"
            onKeyDown={handleKeyDown}
        >
            <div>
                <Label>
                    Title
                </Label>
                <Input value={title} onChange={e => setTitle(e.target.value)}/>
                <FormSubmitError errors={state?.errors?.title}/>
            </div>
            <div>
                <Label>
                    Slug
                </Label>
                <div className="flex gap-2">
                    <Input value={slug} onChange={e => setSlug(e.target.value)}/>
                    <Button variant="outline" onClick={handleSetSlug} type="button">
                        Generate
                    </Button>
                </div>
                <FormSubmitError errors={state?.errors?.slug}/>
            </div>
            <div>
                <Label>
                    Tags
                </Label>
                <TagInput 
                    setTags={setTags} 
                    tags={tags} 
                    activeTagIndex={activeTagIndex} 
                    setActiveTagIndex={setActiveTagIndex} 
                    textCase="lowercase"
                    className="sm:min-w-[450px]"
                    styleClasses={{
                        tagList: {sortableList: "p-1 flex-wrap"},
                        tag: {body: "px-2"}
                    }}
                />
            </div>
            <div className="flex gap-2">
                <Label>
                    Is published
                </Label>
                <Switch checked={isPublished} onCheckedChange={value => setPublished(value)}/>
            </div>
            <div>
                <Label>
                    Content
                </Label>
                <TextEditor text={content} onChange={setContent}/>
                <FormSubmitError errors={state?.errors?.content}/>
            </div>
            <div>
                <Button type="submit">
                    {props.mode === "EDIT" ? "Update" : "Publish"}
                </Button>
            </div>
        </form>
    );
}