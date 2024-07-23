import {ReactNode} from "react";
import Navbar from "./Navbar";



interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return(
        <>
            <Navbar/>
            <div className="flex flex-1">
                <div className="flex justify-center w-full">
                    <div className="flex flex-1 justify-center">
                        <div className="max-w-[620px] w-full mt-[50px] flex flex-col gap-5 items-center flex-1 pb-[50px] sm:px-0 px-5">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;