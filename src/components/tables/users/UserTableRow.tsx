import {TableCell, TableRow} from "@/components/ui/table";
import {User} from "@/types";
import UserActions from "./UserActions";
import UserAvatar from "@/components/UserAvatar";
import {imageUrl} from "@/util";
import {Link} from "react-router-dom";



interface UserTableProps {
    user: User;
}

const UserTableRow: React.FC<UserTableProps> = ({user}) => {
    return(
        <TableRow>
            <TableCell>
                <UserAvatar 
                    username={user.name} 
                    image={imageUrl(user.profileImage)}
                />
            </TableCell>
            <TableCell>
            <Link to={"../../user/"+user.id} className="hover:underline">
                {user.name}
            </Link>
            </TableCell>
            <TableCell>
                {user.email}
            </TableCell>
            <TableCell>
                {user.role}
            </TableCell>
            <TableCell>
                <UserActions user={user}/>
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;