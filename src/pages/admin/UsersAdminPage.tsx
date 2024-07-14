import UserTable from "@/components/tables/users/UserTable";
import {useEffect, useState} from "react";
import server from "@/constants/server";
import {useUsers} from "@/provider/UsersProvider";



const UsersAdminPage: React.FC = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const {setUsers} = useUsers();

    useEffect(() => {
        server.get("/api/users").then(response => {
            setUsers(response.data);
            setLoaded(true);
        });

        return () => setUsers([]);
    }, []);

    if(isLoaded) return(
        <UserTable/>
    );
}

export default UsersAdminPage;