import PostListElement from "@/components/PostListElement";
import {APP_NAME} from "@/constants";
import server from "@/constants/server";
import {PostSummary} from "@/types";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";



const HomePage: React.FC = () => {
    document.title = APP_NAME;

    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        server.get("/api/posts").then(response => {
            setPosts(response.data.content);
            setHasMore(response.data.totalPages != 1);
            setLoaded(true);
        })
    }, []);

    const handleLoadMore = () => {
        server.get("/api/posts", {params: {page: page}}).then(response => {
            setPosts(posts => [...posts, ...response.data.content]);
            setHasMore(response.data.totalPages == page+1)
            setPage(page => page+1);
        });
    }
    
    if(isLoaded) return(
        <div className="flex flex-col gap-5 w-full">
            <h2 className="text-[35px]">
                Posts
            </h2>
            <InfiniteScroll
                hasMore={hasMore}
                dataLength={posts.length || 0}
                next={handleLoadMore}
                loader={<h4>Loading...</h4>}
            >
                <ul className="flex flex-col gap-5">
                    {posts.length ? posts.map(post => (
                        <PostListElement post={post}/>
                    )) : (
                        "There's no posts yet."
                    )}
                </ul>
            </InfiniteScroll>
        </div>
    );
}

export default HomePage;