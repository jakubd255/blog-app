import PostArticle from "@/components/PostArticle";
import server from "@/constants/server";
import {Post} from "@/types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Error from "@/components/Error";
import PostDateAndAuthor from "@/components/PostDateAndAuthor";
import PostTitle from "@/components/PostTitle";
import BackHomeButton from "@/components/BackHomeButton";
import {APP_NAME} from "@/constants";



const PostPage: React.FC = () => {
    const {id} = useParams();

    const [post, setPost] = useState<Post>();
    const [error, setError] = useState<number>(0);

    useEffect(() => {
        server.get("/api/posts/"+id).then(response => {
            setPost(response.data);
            document.title = response.data.title+" | "+APP_NAME;
        })
        .catch(error => {
            console.error(error);
            setError(error.response.status);
        });
    }, [id]);

    if(post) return(
        <div className="flex flex-col gap-5">
            <PostTitle title={post.title}/>
            <PostDateAndAuthor post={post}/>
            <PostArticle text={post.body}/>
            <BackHomeButton/>
        </div>
    );
    else if(error === 404) {
        return <Error status={404} message="Post not found"/>
    }
}

export default PostPage;