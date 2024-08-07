import PostListElement from "@/components/PostListElement";
import {APP_NAME} from "@/constants";
import server from "@/constants/server";
import {PostSummary} from "@/types";
import {useEffect, useState} from "react";



const HomePage: React.FC = () => {
    document.title = APP_NAME;

    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        server.get("/api/posts").then(response => {
            setPosts(response.data.content);
            setLoaded(true);
        })
    }, []);

    
    if(isLoaded) return(
        <div className="flex flex-col gap-5 w-full">
            <h2 className="text-[35px]">
                Posts
            </h2>
            <ul className="flex flex-col gap-5">
                {posts.length ? posts.map(post => (
                    <PostListElement post={post}/>
                )) : (
                    "There's no posts yet."
                )}
            </ul>
        </div>
    );
}

export default HomePage;