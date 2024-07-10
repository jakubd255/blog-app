import {Link} from "react-router-dom";
import DeletePostDialog from "./DeletePostDialog";
import {Button} from "./ui/button";
import {PencilRuler} from "lucide-react";



interface PostActionsProps {
    postId: number;
    deletePost: (id: number) => void;
}

const PostActions: React.FC<PostActionsProps> = ({postId, deletePost}) => {
    return(
        <div className="flex gap-2">
            <DeletePostDialog deletePost={() => deletePost(postId)}/>
            <Button 
                className="w-8 h-8" 
                size="icon" 
                variant="outline" 
                asChild
            >
                <Link to={"post-form?id="+postId}>
                    <PencilRuler className="w-4 h-4"/>
                </Link>
            </Button>
        </div>
    );
};

export default PostActions;