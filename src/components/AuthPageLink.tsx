import {Link} from "react-router-dom";
import {Button} from "./ui/button";



interface AuthPageLinkProps {
    link: string;
    text: string;
    type: "Log in" | "Register";
}

const AuthPageLink: React.FC<AuthPageLinkProps> = ({link, text, type}) => {
    return(
        <div className="flex gap-2 items-center">
            {text}
            <Button variant="link" className="w-min p-0 h-min" asChild>
                <Link to={link} className="!font-sans !text-base">
                    {type}
                </Link>
            </Button>
        </div>
    );
}

export default AuthPageLink;