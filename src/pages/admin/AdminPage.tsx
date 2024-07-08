import PostDate from "@/components/PostDate";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import server from "@/constants/server";
import {PostSummary} from "@/types";
import {PencilRuler, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";



const AdminPage: React.FC = () => {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        server.get("/api/posts").then(response => {
            setPosts(response.data);
            setLoaded(true);
        })
    }, []);

    const deletePost = (id: number) => {
        server.delete("/api/posts/"+id).then(() => {
            setPosts(posts => posts.filter(post => post.id !== id));
        });
    }
    
    if(isLoaded) return(
        <div>
            <h2>
                Posts
            </h2>
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Title
                    </TableHead>
                    <TableHead>
                        Created
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map(post => (
                    <TableRow>
                        <TableCell>
                            {post.title}
                        </TableCell>
                        <TableCell>
                            <PostDate date={post.date}/>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Button 
                                    className=" w-8 h-8"  
                                    size="icon" 
                                    variant="outline"
                                    onClick={() => deletePost(post.id)}
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                                <Button 
                                    className=" w-8 h-8"  
                                    size="icon" 
                                    variant="outline"
                                    asChild
                                >
                                    <Link to={"/post-form?id="+post.id}>
                                        <PencilRuler className="w-4 h-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    );
}

export default AdminPage;