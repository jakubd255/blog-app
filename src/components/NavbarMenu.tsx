import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {Button} from "./ui/button";
import {AlignJustify, LogIn, LogOut, Plus, ShieldPlus} from "lucide-react";
import server from "@/constants/server";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";



const NavbarMenu: React.FC = () => {
    const [cookie] = useCookies(["is-logged"]);

    const handleLogOut = () => {
        server.get("/api/auth/log-out").then(() => {

        });
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <AlignJustify className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {cookie["is-logged"] ? (
                    <>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link to="/admin">
                                <ShieldPlus className="mr-2 h-4 w-4"/>
                                Admin panel
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link to="/post-form">
                                <Plus className="mr-2 h-4 w-4"/>
                                Add post
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            Log out
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to="/log-in">
                            <LogIn className="mr-2 h-4 w-4"/>
                            Log in
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default NavbarMenu;