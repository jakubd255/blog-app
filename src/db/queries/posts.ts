import { and, arrayContains, desc, eq, sql } from "drizzle-orm";
import db from "..";
import { posts } from "../schema";
import { PAGE_SIZE } from "@/lib/constants";

export const addPost = async (title: string, slug: string, content: string, isPublished: boolean, tags: string[]) => {
    const res = await db
        .insert(posts)
        .values({title, slug, content, isPublished, tags, userId: 1})
        .returning();
    return res.at(0)!;
}

export const getPosts = async (page: number = 1) => {
    const [count] = await db
        .select({count: sql`count(*)`.mapWith(Number)})
        .from(posts)

    const res =  await db.query.posts.findMany({
        orderBy: desc(posts.createdAt),
        limit: PAGE_SIZE,
        offset: (page-1)*PAGE_SIZE
    });

    return {posts: res, ...count};
}

export const getPublishedPosts = async (page: number = 1) => {
    const condition = eq(posts.isPublished, true);

    const [count] = await db
        .select({count: sql`count(*)`.mapWith(Number)})
        .from(posts)
        .where(condition)

    const res = await db.query.posts.findMany({
        where: condition,
        orderBy: desc(posts.createdAt),
        limit: PAGE_SIZE,
        offset: (page-1)*PAGE_SIZE
    });

    return {posts: res, ...count};
}

export const getPostsByTag = async (tag: string, page: number = 1) => {
    const condition = and(
        arrayContains(posts.tags, [tag]),
        eq(posts.isPublished, true)
    );

    const [count] = await db
        .select({count: sql`count(*)`.mapWith(Number)})
        .from(posts)
        .where(condition)

    const res = await db.query.posts.findMany({
        where: and(
            arrayContains(posts.tags, [tag]),
            eq(posts.isPublished, true)
        ),
        orderBy: desc(posts.createdAt),
        limit: PAGE_SIZE,
        offset: (page-1)*PAGE_SIZE
    });

    return {posts: res, ...count};
}

export const getPostBySlug = async (slug: string) => {
    return await db.query.posts.findFirst({
        where: eq(posts.slug, slug)
    });
}

export const getPostById = async (id: number) => {
    return await db.query.posts.findFirst({
        where: eq(posts.id, id)
    });
}

export const updatePostById = async (id: number, title: string, slug: string, content: string, isPublished: boolean, tags: string[]) => {
    await db
        .update(posts)
        .set({title, slug, content, isPublished, tags})
        .where(eq(posts.id, id));
}

export const deletePostById = async (id: number) => {
    await db
        .delete(posts)
        .where(eq(posts.id, id));
}