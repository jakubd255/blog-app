import PageNavigation from "@/components/PageNavigation";
import PostTable from "@/components/tables/posts/PostTable";
import {APP_NAME} from "@/constants";
import server from "@/constants/server";
import {useAuth} from "@/provider/AuthProvider";
import {usePosts} from "@/provider/PostsProvider";
import {Page} from "@/types";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";



const ReadactorPage: React.FC = () => {
    document.title = "Redactor panel | "+APP_NAME;
    
    const {user} = useAuth();
    const {setPosts} = usePosts();
    const [searchParams] = useSearchParams();
    const [pageData, setPageData] = useState<Page>();

    useEffect(() => {
        const page = searchParams.get("page") as unknown as number || 1;

        if(user) {
            server.get("/api/posts/user/"+user?.id+"/all", {params: {size: 5, page: page-1}}).then(response => {
                setPosts(response.data.content);
                setPageData(response.data.page);
            });
        }
    }, [user?.id, searchParams]);

    if(user?.role === "ROLE_REDACTOR" && pageData) return(
        <>
            <PostTable/>
            <PageNavigation page={pageData}/>
        </>
    );
}

export default ReadactorPage;