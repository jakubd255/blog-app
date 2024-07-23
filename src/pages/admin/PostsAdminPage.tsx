import PageNavigation from "@/components/PageNavigation";
import PostTable from "@/components/tables/posts/PostTable";
import server from "@/constants/server";
import {usePosts} from "@/provider/PostsProvider";
import {Page} from "@/types";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";



const PostsAdminPage: React.FC = () => {
    const {setPosts} = usePosts();
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const [pageData, setPageData] = useState<Page>();

    useEffect(() => {
        const page = searchParams.get("page") as unknown as number || 1;

        server.get("/api/posts/all", {params: {size: 5, page: page-1}}).then(response => {
            setPosts(response.data.content);
            setPageData(response.data.page);
            setLoaded(true);
        });
    }, [searchParams]);

    if(isLoaded && pageData) return(
        <>
            <PostTable showAuthor/>
            <PageNavigation page={pageData}/>
        </>
    );
}

export default PostsAdminPage;