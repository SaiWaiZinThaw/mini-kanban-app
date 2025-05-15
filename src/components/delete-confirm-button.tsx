import { deleteTask } from "@/utils/firebase";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import LoadingButton from "./loading-button";
import { Trash2 } from "lucide-react";

const DeleteConfirmButton = ({ id }: { id: string }) => {
  const [onOpenChange, setOnOpenChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTask(id);
      setOnOpenChange(false);
    } catch (err) {
      console.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Trash2
          onClick={() => setOnOpenChange(true)}
          className="w-5 h-5 cursor-pointer text-destructive"
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="py-6">
        <Trash2 size={48} className="mx-auto  text-muted-foreground" />
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="!flex-col mx-auto items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hover:bg-transparent hover:opacity-90"
              disabled={loading}
              onClick={() => setOnOpenChange(false)}
            >
              Cancel
            </Button>

            <LoadingButton
              onClick={handleDelete}
              isLoading={loading}
              variant={"destructive"}
            >
              Delete
            </LoadingButton>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmButton;
