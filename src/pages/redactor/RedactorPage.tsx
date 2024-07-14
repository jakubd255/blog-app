import PostTable from "@/components/tables/posts/PostTable";
import server from "@/constants/server";
import {useAuth} from "@/provider/AuthProvider";
import {usePosts} from "@/provider/PostsProvider";
import {useEffect} from "react";



const ReadactorPage: React.FC = () => {
    const {user} = useAuth();
    const {setPosts} = usePosts();

    useEffect(() => {
        if(user) {
            server.get("/api/posts/user/"+user?.id+"/all").then(response => {
                setPosts(response.data);
                console.log(response.data);
            });
        }
    }, [user?.id]);

    if(user?.role === "ROLE_REDACTOR") return(
        <div>
            <PostTable/>
        </div>
    );
}

export default ReadactorPage;