import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import {Home} from "lucide-react";



interface ErrorProps {
    status: number;
    message: string;
}

const Error: React.FC<ErrorProps> = ({status, message}) => {
    return(
        <div className="flex flex-col gap-5 items-center">
            <div>
                <h1 className="text-center text-7xl">
                    {status}
                </h1>
                <h2 className="text-center text-4xl">
                    {message}
                </h2>
            </div>
            <Button asChild>
                <Link to="/">
                    <Home className="mr-2 h-4 w-4"/>
                    Go back home
                </Link>
            </Button>
        </div>
    );
}

export default Error;