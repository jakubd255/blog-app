import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import { Button } from "./ui/button";
import BlogTitle from "./blog-title";

export default function Navbar() {
    return(
        <header className="w-full px-4 py-2 z-10 flex justify-between items-center border-b sticky top-0 backdrop-blur bg-background/90">
            <BlogTitle/>
            <div className="flex gap-2">
                <Button variant="link" asChild>
                    <Link href="/about">
                        About
                    </Link>
                </Button>
                <DarkModeToggle/>
            </div>
        </header>
    );
}