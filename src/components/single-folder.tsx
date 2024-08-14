import { type Folder } from "@prisma/client";
import Link from "next/link";

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Accordion } from "@radix-ui/react-accordion";
import { FolderIcon } from "lucide-react";
import { cookies } from "next/headers";
import DeleteFolder from "./delete-folder";
import FileUPloader from "./file-uploader";
import ShowFiles from "./show-files";

export const AllFolders = ({ folders }: { folders: Folder[] }) => {
  const cookieStore = cookies();
  const psw = cookieStore.get("psw");

  const hasAuth = psw?.value == '99991955'

  return (
    <Accordion type="single" collapsible className="grid gap-2">
      {folders.map((folder) => {
        return (
          <SingleFolder key={folder.id} folder={folder} isChecked={false}>
            <ShowFiles folderId={folder.id} folderName={folder.name} />
            {hasAuth && (
              <div className="mt-5 flex items-center gap-3">
                <DeleteFolder folderId={folder.id} />
                <FileUPloader folderId={folder.id} />
              </div>
            )}
          </SingleFolder>
        );
      })}
    </Accordion>
  );
};

const SingleFolder = ({
  folder,
  children,
}: {
  folder: Folder;
  isChecked: boolean;
  children: React.ReactNode;
}) => {
  return (
    <AccordionItem value={String(folder.id)} key={folder.id}>
      <AccordionTrigger className="flex items-center gap-3 rounded-md bg-muted px-4 py-3 hover:bg-muted/50">
        <Link
          key={folder.id}
          href={`/?folderId=${folder.id}`}
          // className="flex item-center px-4 py-3 gap-3"
          className="flex items-center gap-3 rounded-md bg-muted py-3"
          // className="flex items-center gap-3 rounded-md bg-muted px-4 py-3 hover:bg-muted/50"
          prefetch={false}
        >
          <FolderIcon className="h-6 w-6" />
          <div className="flex-1 truncate">{folder.name}</div>
          {/* <ChevronRightIcon className="h-5 w-5 text-muted-foreground" /> */}
        </Link>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default SingleFolder;
