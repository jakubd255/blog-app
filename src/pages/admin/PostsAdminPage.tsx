import PostTable from "@/components/tables/posts/PostTable";
import server from "@/constants/server";
import {usePosts} from "@/provider/PostsProvider";
import {useEffect, useState} from "react";



const PostsAdminPage: React.FC = () => {
    const {setPosts} = usePosts();
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        server.get("/api/posts/all").then(response => {
            setPosts(response.data);
            setLoaded(true);
        })
    }, []);

    if(isLoaded) return(
        <PostTable showAuthor/>
    );
}

export default PostsAdminPage;