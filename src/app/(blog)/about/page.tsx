import UserAvatar from "@/components/user-avatar";
import UserLink from "@/components/user-link";
import { getCachedAdmin } from "@/lib/cache/admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "About - Blog App"
};

export default async function AboutPage() {
    const admin = await getCachedAdmin();
    if(!admin) {
        notFound();
    }

    return(
        <div className="flex flex-col gap-10 items-center">
            <UserAvatar user={admin} size="xl"/>
            {admin.bio && (
                <article className="bio">
                    <div dangerouslySetInnerHTML={{__html: admin.bio}}>
                    </div>
                </article>
            )}
            <div className="flex gap-4">
                {admin.links?.map((link, index) => (
                    <UserLink link={link} key={index}/>
                ))}
            </div>
        </div>
    );
}