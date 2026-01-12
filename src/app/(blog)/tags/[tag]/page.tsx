import PostListElement from "@/components/post-list-element";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { Separator } from "@/components/ui/separator";
import { getCachedPostsByTag } from "@/lib/cache/posts";
import { Metadata } from "next";

interface TagPageProps {
    params: Promise<{tag: string}>;
    searchParams: Promise<{page?: number}>;
}

export async function generateMetadata({params}: TagPageProps): Promise<Metadata> {
    const {tag} = await params;
    return {title: `#${tag} - Blog App`};
}

export default async function TagPage({params, searchParams}: TagPageProps) {
    const {tag} = await params;
    const {page} = await searchParams;
    const {posts, count} = await getCachedPostsByTag(tag, page);

    return(
        <div className="flex flex-col gap-4">
            <h1>
                Posts with #{tag}
            </h1>
            {posts.map(post => (
                <PostListElement post={post} key={post.id}/>
            ))}
            <Separator/>
            <PaginationWithLinks page={page} totalCount={count}/>
        </div>
    );
}