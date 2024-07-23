import UserTable from "@/components/tables/users/UserTable";
import {useEffect, useState} from "react";
import server from "@/constants/server";
import {useUsers} from "@/provider/UsersProvider";
import PageNavigation from "@/components/PageNavigation";
import {useSearchParams} from "react-router-dom";
import {Page} from "@/types";



const UsersAdminPage: React.FC = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const {setUsers} = useUsers();
    const [searchParams] = useSearchParams();
    const [pageData, setPageData] = useState<Page>();

    useEffect(() => {
        const page = searchParams.get("page") as unknown as number || 1;
        
        server.get("/api/users", {params: {size: 5, page: page-1}}).then(response => {
            setUsers(response.data.content);
            setPageData(response.data.page);
            setLoaded(true);
        });
    }, [searchParams]);

    if(isLoaded && pageData) return(
        <>
            <UserTable/>
            <PageNavigation page={pageData}/>
        </>
    );
}

export default UsersAdminPage;