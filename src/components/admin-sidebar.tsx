import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, Newspaper, User, UserCog } from "lucide-react";

export default function AdminSidebar() {
    return(
        <div className="flex flex-col gap-2 p-2">
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/admin">
                    <LayoutDashboard className="w-5 h-5 mr-2"/>
                    Dashboard
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/admin/posts">
                    <Newspaper className="w-5 h-5 mr-2"/>
                    Posts
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/admin/profile">
                    <User className="w-5 h-5 mr-2"/>
                    Profile
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
                <Link href="/admin/account">
                    <UserCog className="w-5 h-5 mr-2"/>
                    Account
                </Link>
            </Button>
        </div>
    );
}