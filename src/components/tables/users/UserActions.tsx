import ChangeRoleDialog from "@/components/ChangeRoleDialog";
import DeleteRowDialog from "@/components/DeleteRowDialog";
import { useAuth } from "@/provider/AuthProvider";
import { useUsers } from "@/provider/UsersProvider";
import {User} from "@/types";



interface UserActionsProps {
    user: User;
}

const UserActions: React.FC<UserActionsProps> = ({user}) => {
    const {user: authUser} = useAuth();
    const {deleteUser} = useUsers();

    if(authUser?.role === "ROLE_ADMIN" && authUser.id !== user.id) return(
        <div className="flex gap-2">
            <ChangeRoleDialog user={user}/>
            <DeleteRowDialog 
                deleteRow={() => deleteUser(user.id)}    
                title="Are you sure to delete this user?"             
            />
        </div>
    );
    else return "-";
};

export default UserActions;