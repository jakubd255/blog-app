import server from "@/constants/server";
import {PostSummary} from "@/types";
import {createContext, ReactNode, useContext, useState} from "react";



export interface PostsContextType {
    posts: PostSummary[];
    setPosts: React.Dispatch<React.SetStateAction<PostSummary[]>>;
    deletePost: (id: number) => void;
}

export const postsContext = createContext<PostsContextType | null>(null);

const PostsProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [posts, setPosts] = useState<PostSummary[]>([]);

    const deletePost = (id: number) => {
        server.delete("/api/posts/"+id).then(() => {
            setPosts(posts => posts.filter(post => post.id !== id));
        })
    }

    return(
        <postsContext.Provider value={{posts, setPosts, deletePost}}>
            {children}
        </postsContext.Provider>
    );
}

export default PostsProvider;


export const usePosts = () => {
    const context = useContext(postsContext);
    if(!context) {
        throw new Error("usePosts must be used within a PostsProvider");
    }
    return context;
};