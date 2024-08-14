import { TrashIcon } from "lucide-react";
import { deleteFolder } from "~/app/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type ReactNode } from "react";
import { Button } from "./ui/button";

function DeleteFolder({ folderId }: { folderId: number }) {
  return (
    <DeleteAlert folderId={folderId}>
      <Button variant="destructive">Delete folder</Button>
    </DeleteAlert>
  );
}

export default DeleteFolder;

export const DeleteAlert = ({
  children,
  folderId,
}: {
  children: ReactNode
        folderId: number
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={deleteFolder} className="flex items-center gap-3">
              <input name="folderId" type="hidden" value={folderId} />

              <button
                type="submit"
                // className={`flex items-center rounded-md bg-red-500 px-4 py-2 text-center text-white`}
              >
                Delete folder
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
