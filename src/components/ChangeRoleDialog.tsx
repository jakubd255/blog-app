import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog";
import {Shield} from "lucide-react";
import {Button} from "./ui/button";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {Role, User} from "@/types";
import {useState} from "react";
import {useUsers} from "@/provider/UsersProvider";



interface ChangeRoleDialogProps {
    user: User;
}

const ChangeRoleDialog: React.FC<ChangeRoleDialogProps> = ({user}) => {
    const [role, setRole] = useState<Role>(user.role);
    const {updateRole} = useUsers();

    const handleUpdateRole = () => {
        updateRole(user.id, role);
    }

    return(
        <Dialog>
            <DialogTrigger>
                <Button
                    className="w-8 h-8" 
                    size="icon" 
                    variant="outline"
                >
                    <Shield className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Update role
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <RadioGroup 
                        value={role} 
                        onValueChange={(value: string) => setRole(value as Role)}
                    >
                        <label className="flex gap-2 items-center">
                            <RadioGroupItem value="ROLE_ADMIN"/>
                            ROLE_ADMIN
                        </label>
                        <label className="flex gap-2 items-center">
                            <RadioGroupItem value="ROLE_REDACTOR"/>
                            ROLE_REDACTOR
                        </label>
                        <label className="flex gap-2 items-center">
                            <RadioGroupItem value="ROLE_USER"/>
                            ROLE_USER
                        </label>
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={handleUpdateRole}>
                            Confirm
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ChangeRoleDialog;