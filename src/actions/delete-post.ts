import { deletePostById } from "@/db/queries/posts";
import { redirect } from "next/navigation";

export default async function deletePostAction(id: number) {
    await deletePostById(id);
    redirect("/admin/posts");
}