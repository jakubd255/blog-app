import React from "react";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table";



const UserTableHeader: React.FC = () => {
    return(
        <TableHeader>
            <TableRow>
                <TableHead>
                    Avatar
                </TableHead>
                <TableHead>
                    Name
                </TableHead>
                <TableHead>
                    Email
                </TableHead>
                <TableHead>
                    Role
                </TableHead>
                <TableHead>
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default UserTableHeader;