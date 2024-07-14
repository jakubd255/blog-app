import {Table, TableBody} from "@/components/ui/table";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import {useUsers} from "@/provider/UsersProvider";



const UserTable: React.FC = () => {
    const {users} = useUsers();

    return(
        <>
            <h2>
                Users
            </h2>
            <Table>
                <UserTableHeader/>
                <TableBody>
                    {users.map(user => (
                        <UserTableRow user={user}/>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default UserTable;