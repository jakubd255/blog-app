import PostForm from "@/components/post-form";
import { getPostById } from "@/db/queries/posts";
import { notFound } from "next/navigation";

interface PostEditorPageProps {
    params: Promise<{id?: number}>;
}

export default async function PostEditorPage({params}: PostEditorPageProps) {
    const {id} = await params;
    const post = id ? (await getPostById(id)) : null;

    if(!post) {
        notFound();
    }

    return(<PostForm post={post} editMode/>);
}