interface DeletePostDialogProps {
    deletePost: () => void;
}

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({deletePost}) => {
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
                        Are you sure to delete this post?
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button 
                        onClick={deletePost} 
                        variant="destructive"
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeletePostDialog;