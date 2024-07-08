import {ReactNode} from "react";
import Navbar from "./Navbar";



interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return(
        <>
            <Navbar/>
            <div className="flex justify-center">
                <div className="max-w-[700px] w-full mt-[50px] flex flex-col gap-5 items-center">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Layout;