export interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    tags: string[] | null;
    isPublished: boolean;
    userId: number;
    createdAt: Date;
}

export type Role = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    email: string;
    profileImage?: string | null;
    links: string[] | null;
    bio?: string | null;
    role: Role;
    createdAt: Date;
}