export type Role = "ROLE_USER" | "ROLE_REDACTOR" | "ROLE_ADMIN";

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    profileImage: string;
    bio?: string;
}

export type PostStatus = "DRAFT" | "PUBLISHED";

export interface PostSummary {
    id: number;
    title: string;
    date: string;
    user: User;
    status: PostStatus;
}

export interface Post extends PostSummary {
    body: string
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}