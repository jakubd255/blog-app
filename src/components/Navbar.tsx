import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import server from "@/constants/server";
import {LogOut, Plus} from "lucide-react";
import {useCookies} from "react-cookie";



const Navbar: React.FC = () => {
    const [cookie] = useCookies(["is-logged"]);

    const handleLogOut = () => {
        server.get("/api/auth/log-out").then(() => {

        });
    }
    
    return(
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60 py-2 px-5">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link to="/">
                        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight hover:underline text-primary">
                            BlogApp
                        </h1>
                    </Link>
                </div>
                <div className="flex gap-2">
                    {cookie["is-logged"] ? (
                        <>
                            <Button variant="outline" onClick={handleLogOut}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                Log out
                            </Button>
                            <Button variant="outline" asChild>
                                <Link to="/post-form">
                                    <Plus className="mr-2 h-4 w-4"/>
                                    Add post
                                </Link>
                            </Button>
                        </>
                    ) : null}
                    <DarkModeToggle/>
                </div>
            </div>
        </header>
    );
}

export default Navbar;