import { type NextRequest, NextResponse } from "next/server";

const checkAuthorization = async (req: NextRequest) => {
    const authHeader = req.headers.get("Authorization");
    if(!authHeader) {
        return false;
    }
  
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  
    return (username === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD);
}

export async function middleware(req: NextRequest) {
    /*const isAuthorized = await checkAuthorization(req);
    
    if(!isAuthorized) {
        return new NextResponse("Unauthorized", {
            status: 401,
            headers: {"WWW-Authenticate": "Basic"}
        });
    }*/
}

export const config = {
    matcher: "/admin/:path*",
};