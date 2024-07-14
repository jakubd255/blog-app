import PostListElement from "@/components/PostListElement";
import server from "@/constants/server";
import {PostSummary} from "@/types";
import {useEffect, useState} from "react";



const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        server.get("/api/posts").then(response => {
            setPosts(response.data);
            setLoaded(true);
        })
    }, []);

    
    if(isLoaded) return(
        <div className="flex flex-col gap-5 w-full">
            <h2>
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