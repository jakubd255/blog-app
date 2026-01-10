"use client"

import { useActionState, useState } from "react";
import getSlug from "speakingurl";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import TextEditor from "./text-editor";
import FormSubmitError from "./form-submit-error";
import { Switch } from "./ui/switch";
import { Tag, TagInput } from "emblor";
import { Post } from "@/lib/types";
import upsertPostAction from "@/actions/upsert-post";

interface PostFormProps {
    post?: Post;
    editMode?: boolean;
}

export default function PostForm({post, editMode=false}: PostFormProps) {
    const [title, setTitle] = useState<string>(post?.title ?? "");
    const [slug, setSlug] = useState<string>(post?.slug ?? "");
    const [content, setContent] = useState<string>(post?.content ?? "");
    const [isPublished, setPublished] = useState<boolean>(post?.isPublished ?? true);
    const [tags, setTags] = useState<Tag[]>(post?.tags?.map(tag => ({id: tag, text: tag})) ?? []);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const handleSetSlug = () => setSlug(getSlug(title));

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if(event.key === "Enter") event.preventDefault();
    };

    const [state, action] = useActionState(async () => {
        return upsertPostAction(post?.id ?? null, title, slug, content, isPublished, tags);
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
                <Input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                />
                <FormSubmitError errors={state?.errors?.title}/>
            </div>
            <div>
                <Label>
                    Slug
                </Label>
                <div className="flex gap-2">
                    <Input 
                        value={slug} 
                        onChange={e => setSlug(e.target.value)} 
                        name="slug"
                    />
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
                <Switch 
                    checked={isPublished} 
                    onCheckedChange={value => setPublished(value)}
                />
            </div>
            <div>
                <Label>
                    Content
                </Label>
                <TextEditor 
                    text={content} 
                    onChange={setContent} 
                />
                <FormSubmitError errors={state?.errors?.content}/>
            </div>
            <div>
                <Button type="submit">
                    {editMode ? "Update" : "Publish"}
                </Button>
            </div>
        </form>
    );
}