import React from "react";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table";



interface PostTableHeaderProps {
    showAuthor?: boolean;
}

const PostTableHeader: React.FC<PostTableHeaderProps> = ({showAuthor=false}) => {
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
                {showAuthor ? (
                    <TableHead>
                        Author
                    </TableHead>
                ) : null}
                <TableHead>
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default PostTableHeader;