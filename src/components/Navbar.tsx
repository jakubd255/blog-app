import {Link} from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import NavbarMenu from "./NavbarMenu";



const Navbar: React.FC = () => {
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
                    <NavbarMenu/>
                    <DarkModeToggle/>
                </div>
            </div>
        </header>
    );
}

export default Navbar;