import PostTable from "@/components/PostTable";
import server from "@/constants/server";
import {PostSummary} from "@/types";
import {useEffect, useState} from "react";



const AdminPage: React.FC = () => {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        server.get("/api/posts/all").then(response => {
            setPosts(response.data);
            setLoaded(true);
        })
    }, []);

    const deletePost = (id: number) => {
        server.delete("/api/posts/"+id).then(() => {
            setPosts(posts => posts.filter(post => post.id !== id));
        });
    }
    
    if(isLoaded) return(
        <div>
            <h2>
                Posts
            </h2>
            <PostTable posts={posts} deletePost={deletePost}/>
        </div>
    );
}

export default AdminPage;