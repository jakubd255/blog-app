import Error from "@/components/Error";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useAuth} from "@/provider/AuthProvider";
import {Link, Outlet, useLocation} from "react-router-dom";



const AdminPage: React.FC = () => {
    const location = useLocation();
    const {user} = useAuth();

    if(user?.role === "ROLE_ADMIN") return(
        <div className="w-[800px]">
            <Tabs defaultValue={location.pathname.split("/")[2]}>
                <TabsList>
                    <TabsTrigger value="posts" asChild>
                        <Link to="posts">
                            Posts
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="users">
                        <Link to="users">
                            Users
                        </Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <Outlet/>
        </div>
    );
    else if(user) return(
        <Error status={403} message="You don't have permission to this section"/>
    );
}

export default AdminPage;