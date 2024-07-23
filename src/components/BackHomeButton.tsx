import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import {ArrowLeft} from "lucide-react";



const BackHomeButton: React.FC = () => {
    return(
        <Button className="p-y px-2" variant="ghost" asChild>
            <Link className="flex gap-2 w-min" to="/">
                <ArrowLeft className="w-5 h-5"/> 
                Go back home
            </Link>
        </Button>
    );
}

export default BackHomeButton;