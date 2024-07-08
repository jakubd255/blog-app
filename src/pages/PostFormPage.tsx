import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import {useEffect, useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import server from "@/constants/server";
import PostArticle from "@/components/PostArticle";
import { useNavigate, useSearchParams } from "react-router-dom";



const PostFormPage: React.FC = () => {
    const [previewMode, setMode] = useState<boolean>(false);

    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const isDisabled: boolean = !text || !title;
    const isEditMode = searchParams.get("id") ? true : false;

    //If id query param - edit existing post
    useEffect(() => {
        const id = searchParams.get("id");
        if(id) {
            server.get("/api/posts/"+id).then(response => {
                setTitle(response.data.title);
                setText(response.data.body);
            });
        }
    }, [searchParams])

    const handlePublish = () => {
        const id = searchParams.get("id");
        const payload = {title: title, body: text};

        //Edit chosen post
        if(isEditMode) {
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

    return(
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
                <Button 
                    className="mt-[45px]" 
                    onClick={handlePublish} 
                    disabled={isDisabled}
                >
                    {isEditMode ? "Edit" : "Publish"}
                </Button>
            </div>
        </div>
    );
}

export default PostFormPage;