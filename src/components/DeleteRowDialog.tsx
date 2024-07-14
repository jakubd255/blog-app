import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";



interface DeleteRowDialogProps {
    title: string;
    deleteRow: () => void;
}

const DeleteRowDialog: React.FC<DeleteRowDialogProps> = ({title, deleteRow}) => {
    return(
        <Dialog>
            <DialogTrigger>
                <Button 
                    className=" w-8 h-8"  
                    size="icon" 
                    variant="outline"
                >
                    <Trash2 className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button 
                        onClick={deleteRow} 
                        variant="destructive"
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteRowDialog;