import server from "@/constants/server";
import {Role, User} from "@/types";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";



export interface UsersContextType {
    users: User[];
    updateRole: (id: number, role: Role) => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    deleteUser: (id: number) => void;
}

export const usersContext = createContext<UsersContextType | null>(null);

const UsersProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        return () => setUsers([]);
    }, []);

    const updateRole = (id: number, role: Role) => {
        const headers = {headers: {"Content-Type": "application/json"}};
        server.put("/api/users/"+id+"/role", "\""+role+"\"", headers).then(() => {
            setUsers(users => users.map(user => {
                if(user.id === id) {
                    user.role = role;
                }
                return user;
            }));
        });
    }

    const deleteUser = (id: number) => {
        server.delete("/api/users/"+id).then(() => {
            setUsers(users => users.filter(user => user.id !== id));
        });
    }

    return(
        <usersContext.Provider value={{users, updateRole, setUsers, deleteUser}}>
            {children}
        </usersContext.Provider>
    );
}

export default UsersProvider;


export const useUsers = () => {
    const context = useContext(usersContext);
    if(!context) {
        throw new Error("useUsers must be used within a UsersProvider");
    }
    return context;
};