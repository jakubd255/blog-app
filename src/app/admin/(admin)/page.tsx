import logOutAction from "@/actions/log-out";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    return(
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Link href="/admin/posts">
                    <Card>
                        <CardHeader className="items-center">
                            <CardTitle className="text-xl">
                                Posts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Newspaper size={72}/>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" asChild>
                    <Link href="/">
                        Exit dashboard
                    </Link>
                </Button>
                <Button variant="outline" onClick={logOutAction}>
                    Log out
                </Button>
            </div>
        </div>
    );
}