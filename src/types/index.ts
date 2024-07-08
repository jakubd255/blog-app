export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface PostSummary {
    id: number;
    title: string;
    date: string;
    user: User;
}

export interface Post extends PostSummary {
    body: string
}