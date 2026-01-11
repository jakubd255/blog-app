import { unstable_cache } from "next/cache";
import { getPublishedPosts, getPostsByTag } from "@/db/queries/posts";

const settings = {tags: ["posts"], revalidate: 60};

export const getCachedPublishedPosts = unstable_cache(
    async (page?: number) => getPublishedPosts(page),
    ["published-posts"],
    settings
);

export const getCachedPostsByTag = unstable_cache(
    async (tag: string, page?: number) => getPostsByTag(tag, page),
    ["posts-by-tag"],
    settings
);