import { unstable_cache } from "next/cache";
import { getPublishedPosts, getPostsByTag, getPostBySlug } from "@/db/queries/posts";
import { cache } from "react";

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

export const getCachedPostBySlug = cache(getPostBySlug);