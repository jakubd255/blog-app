import {useAuth} from "@/provider/AuthProvider";
import EmailUpdate from "@/components/EmailUpdate.tsx";
import PasswordUpdate from "@/components/PasswordUpdate.tsx";
import ProfileImageUpdate from "@/components/ProfileImageUpdate.tsx";
import NameBioUpdate from "@/components/NameBioUpdate.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {APP_NAME} from "@/constants";



const AccountPage: React.FC = () => {
    document.title = "Account settings | "+APP_NAME;

    const {user} = useAuth();

    if(user) return(
        <div className="w-full">
            <h1>
                Account settings
            </h1>
            <div className="flex flex-col gap-10">
                <Tabs defaultValue="details">
                    <TabsList>
                        <TabsTrigger value="details">
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="email">
                            Email
                        </TabsTrigger>
                        <TabsTrigger value="password">
                            Password
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <ProfileImageUpdate/>
                        <NameBioUpdate/>
                    </TabsContent>
                    <TabsContent value="email">
                        <EmailUpdate/>
                    </TabsContent>
                    <TabsContent value="password">
                        <PasswordUpdate/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default AccountPage;