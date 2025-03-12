import AdminSidebar from "@/components/admin-sidebar";
import { SessionProvider } from "@/components/providers/session-provider";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {
    const {session, user} = await validateRequest();
    if(!session || !user) {
        redirect("/admin/auth");
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