import PostDate from "@/components/post-date";
import PostTagsList from "@/components/post-tags-list";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/db/queries/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
    params: Promise<{slug: string}>
}

export default async function PostPage({params}: PostPageProps) {
    const {slug} = await params;

    const post = await getPostBySlug(slug);
    if(!post) {
        notFound();
    }

    return(
        <div className="flex flex-col gap-5 mb-10">
            <h1 className="text-5xl">
                {post.title}
            </h1>
            <PostTagsList tags={post.tags}/>
            <PostDate date={post.createdAt}/>
            <article className="flex flex-col" dangerouslySetInnerHTML={{__html: post.content}}>
            </article>
            <div className="flex justify-center">
                <div>
                    <Button variant="ghost" asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 w-4 h-4"/>
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}