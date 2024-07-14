import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {PencilRuler} from "lucide-react";
import DeleteRowDialog from "@/components/DeleteRowDialog";
import {usePosts} from "@/provider/PostsProvider";



interface PostActionsProps {
    postId: number;
}

const PostActions: React.FC<PostActionsProps> = ({postId}) => {
    const {deletePost} = usePosts();

    return(
        <div className="flex gap-2">
            <DeleteRowDialog 
                deleteRow={() => deletePost(postId)} 
                title="Are you sure to delete this post?"
            />
            <Button 
                className="w-8 h-8" 
                size="icon" 
                variant="outline" 
                asChild
            >
                <Link to={"../../post-form?id="+postId}>
                    <PencilRuler className="w-4 h-4"/>
                </Link>
            </Button>
        </div>
    );
};

export default PostActions;