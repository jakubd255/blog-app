import { Post } from "@/lib/types";
import Link from "next/link";
import PostDate from "./post-date";
import PostTagsList from "./post-tags-list";

interface PostListElementProps {
    post: Post;
}

export default function PostListElement({post}: PostListElementProps) {
    return(
        <div key={post.id} className="flex flex-col gap-1">
            <Link 
                href={`/posts/${post.slug}`} 
                className="hover:underline text-lg font-semibold"
            >
                {post.title}
            </Link>
            <PostTagsList tags={post.tags}/>
            <PostDate date={post.createdAt}/>
        </div>
    );
}