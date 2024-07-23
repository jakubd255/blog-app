import UserAvatar from "@/components/UserAvatar";
import server from "@/constants/server";
import {Post, User} from "@/types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Error from "@/components/Error";
import {imageUrl} from "@/util";
import PostListElement from "@/components/PostListElement";
import {Separator} from "@/components/ui/separator";
import {APP_NAME} from "@/constants";



const UserPage: React.FC = () => {
    const {id} = useParams();
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<number>(0);
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        server.get("/api/users/"+id).then(response => {
            setUser(response.data);
            document.title = response.data.name+" | "+APP_NAME;

            server.get("/api/posts/user/"+id).then(response => {
                setPosts(response.data.content);
            });
        })
        .catch(error => {
            console.error(error);
            setError(error.response.status);
        });
    }, [id]);

    if(user) return(
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center">
                        <UserAvatar 
                            username={user.name} 
                            image={imageUrl(user.profileImage)}
                            size="lg"
                        />
                    </div>
                    <h1 className="text-center">
                        {user.name}
                    </h1>
                </div>
                <pre className="flex whitespace-pre-wrap font-sans text-xl">
                    {user.bio}
                </pre>
            </div>

            {posts.length ? (
                <div className="flex flex-col gap-5">
                    <Separator/>
                    <ul className="flex flex-col gap-5">
                        {posts.map(post => (
                            <PostListElement post={post}/>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
    else if(error === 404) {
        return <Error status={404} message="User not found"/>
    }
}

export default UserPage;