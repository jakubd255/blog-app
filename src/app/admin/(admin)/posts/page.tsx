import PostsTable from "@/components/posts-table";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { getPosts } from "@/lib/db/queries/posts";
import { Plus } from "lucide-react";
import Link from "next/link";

interface AdminPostsPageProps {
    searchParams: Promise<{page?: number}>;
}

export default async function AdminPostsPage({searchParams}: AdminPostsPageProps) {
    const page = (await searchParams).page ?? 1;
    const {posts, count} = await getPosts(page);

    return(
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <h1 className="text-2xl">
                    Posts
                </h1>
                <Button asChild>
                    <Link href="/admin/posts/editor">
                        <Plus className="mr-2 w-4 h-4"/>
                        Add post
                    </Link>
                </Button>
            </div>
            <PostsTable posts={posts}/>
            <PaginationWithLinks page={page} totalCount={count}/>
        </div>
    );
}