import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import {useEffect, useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import server from "@/constants/server";
import PostArticle from "@/components/PostArticle";
import {useNavigate, useSearchParams} from "react-router-dom";
import {PostStatus, PostSummary} from "@/types";
import {useAuth} from "@/provider/AuthProvider";
import Error from "@/components/Error";



const PostFormPage: React.FC = () => {
    const {user} = useAuth();
    
    const [previewMode, setMode] = useState<boolean>(false);
    const [editedPost, setPost] = useState<PostSummary>();

    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const isDisabled: boolean = !text || !title;

    

    //If id query param - edit existing post
    useEffect(() => {
        const id = searchParams.get("id");
        if(id) {
            server.get("/api/posts/"+id).then(response => {
                const {body, ...post} = response.data;

                setTitle(post.title);
                setText(body);
                setPost(post);
            });
        }
    }, [searchParams])

    const handleSave = (status: PostStatus) => {
        const id = searchParams.get("id");

        const payload = {
            title: title, 
            body: text, 
            status: status
        };

        //Edit chosen post
        if(editedPost) {
            server.put("/api/posts/"+id, payload).then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
        }
        //Add new post
        else {
            server.post("/api/posts", payload).then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    if(user?.role !== "ROLE_USER") return(
        <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center space-x-2">
                <Switch 
                    id="mode" 
                    checked={previewMode} 
                    onCheckedChange={setMode} 
                    disabled={isDisabled}
                />
                <Label htmlFor="mode">
                    Preview mode
                </Label>
            </div>
            <div className="flex flex-col gap-3">
                {previewMode ? (
                    <>
                        <h2>
                            {title}
                        </h2>
                        <PostArticle text={text}/>
                    </>
                ) : (
                    <>
                        <div>
                            <Label>
                                Title
                            </Label>
                            <Input 
                                value={title} 
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <ReactQuill 
                            theme="snow" 
                            value={text} 
                            onChange={setText}
                        />
                    </>
                )}
                <div className="flex gap-2 mt-[45px] w-full">
                    {(editedPost?.status == "DRAFT" || !editedPost) ? (
                        <>
                            <Button 
                                onClick={() => handleSave("PUBLISHED")} 
                                disabled={isDisabled}
                            >
                                Publish
                            </Button>
                            <Button
                                onClick={() => handleSave("DRAFT")} 
                                disabled={isDisabled}
                            >
                                {editedPost ? "Edit draft" : "Save draft"}
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={() => handleSave("PUBLISHED")} 
                            disabled={isDisabled}
                        >
                            Edit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
    else if(user) return(
        <Error status={403} message="You don't have permission to this section"/>
    );
}

export default PostFormPage;