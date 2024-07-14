import server from "@/constants/server";
import {User} from "@/types";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export interface AuthContextType {
    user: User | undefined;
    updateUser: (data: any) => void;
    logOut: () => void;
}

export const authContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User>();
    const updateUser = (data: any) => setUser({...user, ...data});
    const [cookies, , removeCookie] = useCookies(["is-logged"]);

    useEffect(() => {
        if(cookies["is-logged"]) {
            server.get("/api/auth").then(response => {
                setUser(response.data);
            });
        }
    }, [cookies]);

    const logOut = () => {
        server.get("/api/auth/log-out").then(() => {
            removeCookie("is-logged");
            setUser(undefined);
        });
    }

    return(
        <authContext.Provider value={{user, updateUser, logOut}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(authContext);
    if(!context) {
        throw new Error("useAuth must be used within a UsersProvider");
    }
    return context;
};