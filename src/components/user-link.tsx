import Link from "next/link";
import { Button } from "./ui/button";
import { Facebook, Github, Instagram, Linkedin, LinkIcon, Youtube } from "lucide-react";

interface UserLinkProps {
    link: string;
}

export default function UserLink({link}: UserLinkProps) {
    const ICON_CLASS = "h-5 w-5";
    const getIcon = (link: string) => {
        if(link.includes("github")) return(
            <><Github className={ICON_CLASS}/>GitHub</>
        );
        else if(link.includes("facebook")) return(
            <><Facebook className={ICON_CLASS}/>Facebook</>
        );
        else if(link.includes("linkedin")) return(
            <><Linkedin className={ICON_CLASS}/>LinkedIn</>
        );
        else if(link.includes("youtube")) return(
            <><Youtube className={ICON_CLASS}/>YouTube</>
        );
        else if(link.includes("instagram")) return(
            <><Instagram className={ICON_CLASS}/>Instagram</>
        );
        else return(<LinkIcon className={ICON_CLASS}/>);
    }
    
    return(
        <Button variant="outline" asChild>
            <Link href={link} className="flex gap-2" target="_blank">
                {getIcon(link)}
            </Link>
        </Button>
    );
}