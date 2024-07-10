import React from "react";
import {TableHead, TableHeader, TableRow} from "./ui/table";



const PostTableHeader: React.FC = () => {
    return(
        <TableHeader>
            <TableRow>
                <TableHead>
                    Title
                </TableHead>
                <TableHead>
                    Created
                </TableHead>
                <TableHead>
                    Status
                </TableHead>
                <TableHead>
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default PostTableHeader;