import PostArticle from "@/components/PostArticle";
import server from "@/constants/server";
import {Post} from "@/types";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Error from "@/components/Error";
import PostDateAndAuthor from "@/components/PostDateAndAuthor";



const PostPage: React.FC = () => {
    const {id} = useParams();

    const [post, setPost] = useState<Post>();
    const [error, setError] = useState<number>(0);

    useEffect(() => {
        server.get("/api/posts/"+id).then(response => {
            setPost(response.data);
        })
        .catch(error => {
            console.error(error);
            setError(error.response.status);
        })
    }, [id]);

    if(post) return(
        <div className="flex flex-col gap-5">
            <h1>
                {post.title}
            </h1>
            <PostDateAndAuthor post={post}/>
            <div className="flex flex-wrap">
                <PostArticle text={post.body}/>
            </div>
            
            <Link to="/" className="hover:underline flex items-center gap-2 font-bold">
                ← Go back home
            </Link>
        </div>
    );
    else if(error === 404) {
        return <Error status={404} message="Post not found"/>
    }
}

export default PostPage;