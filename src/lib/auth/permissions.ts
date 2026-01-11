import { Role, User } from "../types";

export const hasPermission = (user: User | null, requiredRole: Role): boolean => {
    if(!user) return false;
    if(user.role === "ADMIN") return true;
    return user.role === requiredRole;
};

export const isAdmin = (user: User | null) => {
    return hasPermission(user, "ADMIN");
}