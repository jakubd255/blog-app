import UserAvatar from "@/components/user-avatar";
import UserLink from "@/components/user-link";
import { getAdmin } from "@/db/queries/users";

export default async function AboutPage() {
    const user = (await getAdmin())!;

    return(
        <div className="flex flex-col gap-10 items-center">
            <UserAvatar user={user} size="xl"/>
            {user.bio && (
                <article className="bio">
                    <div dangerouslySetInnerHTML={{__html: user.bio}}>
                    </div>
                </article>
            )}
            <div className="flex gap-4">
                {user.links?.map((link, index) => (
                    <UserLink link={link} key={index}/>
                ))}
            </div>
        </div>
    );
}