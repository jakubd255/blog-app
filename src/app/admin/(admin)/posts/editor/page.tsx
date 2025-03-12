"use server"

import PostForm from "@/components/post-form";
import { getPostById } from "@/lib/db/queries/posts";

interface PostEditorPageProps {
    searchParams: Promise<{postId?: number}>;
}

const getPostDetails = async ({searchParams}: PostEditorPageProps) => {
    const id = (await searchParams).postId;
    const post = id ? (await getPostById(id)) : null;

    if(post) {
        const {title, slug, content, isPublished} = post;
        return {title, slug, content, isPublished, id, mode: "EDIT", tags: post.tags?.map(tag => ({id: tag, text: tag})) || []};
    }
    else {
        return {title: "", slug: "", content: "", id, isPublished: false, mode: "ADD", tags: []};
    }
}

export default async function PostEditorPage({searchParams}: PostEditorPageProps) {
    const details = await getPostDetails({searchParams});

    return(
        <PostForm {...details}/>
    );
}