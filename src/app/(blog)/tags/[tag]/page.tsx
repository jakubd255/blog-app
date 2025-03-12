import PostListElement from "@/components/post-list-element";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { Separator } from "@/components/ui/separator";
import { getPostsByTag } from "@/lib/db/queries/posts";

interface TagPageProps {
    params: Promise<{tag: string}>;
    searchParams: Promise<{page?: number}>;
}

export default async function TagPage({params, searchParams}: TagPageProps) {
    const tag = (await params).tag;
    const page = (await searchParams).page ?? 1;
    const {posts, count} = (await getPostsByTag(tag, page))!;

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