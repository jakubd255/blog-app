import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {Button} from "./ui/button";
import {AlignJustify, CircleUser, LogIn, LogOut, Plus, ShieldPlus} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuth} from "@/provider/AuthProvider";



const NavbarMenu: React.FC = () => {
    const {user, logOut} = useAuth();

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <AlignJustify className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {user ? (
                    <>
                        <DropdownMenuLabel>
                            {user.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link to="/account">
                                <CircleUser className="mr-2 h-4 w-4"/>
                                Account settings
                            </Link>
                        </DropdownMenuItem>
                        {["ROLE_ADMIN", "ROLE_REDACTOR"].includes(user?.role) ? (
                            <>
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    {user.role === "ROLE_ADMIN" ? (
                                        <Link to="/admin/posts">
                                            <ShieldPlus className="mr-2 h-4 w-4"/>
                                            Admin panel
                                        </Link>
                                    ) : (
                                        <Link to="/redactor">
                                            <ShieldPlus className="mr-2 h-4 w-4"/>
                                            Redactor panel
                                        </Link>
                                    )}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link to="/post-form">
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Add post
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        ) : null}
                        <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
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