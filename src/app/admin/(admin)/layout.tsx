import AdminSidebar from "@/components/admin-sidebar";
import { SessionProvider } from "@/components/providers/session-provider";
import { validateRequest } from "@/lib/auth";
import { isAdmin } from "@/lib/auth/permissions";
import { Metadata } from "next";
import { forbidden, redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin Dashboard - Blog App"
};

export default async function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {
    const {session, user} = await validateRequest();
    if(!session || !user) {
        redirect("/admin/auth");
    }
    else if(!isAdmin(user)) {
        forbidden();
    }

    return(
        <SessionProvider value={{user}}>
            <div className="flex">
                <div className="w-[300px] h-screen sticky !top-0 border-r">
                    <AdminSidebar/>
                </div>
                <div className="flex-1 p-10">
                    {children}
                </div>
            </div>
        </SessionProvider>
    );
}