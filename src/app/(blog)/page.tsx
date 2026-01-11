import PostListElement from "@/components/post-list-element";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { Separator } from "@/components/ui/separator";
import { getCachedPublishedPosts } from "@/lib/cache/posts";

interface MainPageProps {
    searchParams: Promise<{page?: number}>;
}

export default async function MainPage({searchParams}: MainPageProps) {
    const {page} = await searchParams;
    const {posts, count} = await getCachedPublishedPosts(page);

    return(
        <div className="flex flex-col gap-4">
            <h1>
                Blog
            </h1>
            {posts.map(post => (
                <PostListElement post={post} key={post.id}/>
            ))}
            <Separator/>
            <PaginationWithLinks page={page} totalCount={count}/>
        </div>
    );
}