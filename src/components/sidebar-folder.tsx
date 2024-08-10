"use client";
import { type Folder } from "@prisma/client";
import { ChevronRightIcon, FolderIcon, Link } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateFolder from "./create-folder";
import FileUPloader from "./file-uploader";

function SidebarFolders({
  folders,
  children,
}: {
  folders: Folder[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  console.log({ selectFolderId: folderId, searchParams });

  return (
    <>
      <main className="grid min-h-[500px] grid-cols-[300px_1fr] divide-x-2 rounded-md border">
        <section className="flex flex-col justify-between p-2">
          <div className="flex flex-col gap-1">
            {folders.map((folder) => {
              return (
                <div
                  key={folder.id}
                  onClick={() => {
                    void router.push(`?folderId=${folder.id}`);
                  }}
                  // className={`border p-2 ${folderId == folder.id && "bg-green-800 text-green-200"}`}
                  className={`flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted ${folderId == folder.id && "bg-muted"}`}
                >
                  <FolderIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">{folder.name}</span>
                </div>
              );
            })}
          </div>
          <CreateFolder />
        </section>

        <section>
          {folderId}
          {children}
          <FileUPloader folderId={folderId} />
        </section>
      </main>
    </>
  );
}

const SingleFolder = ({
  folder,
  isChecked,
}: {
  folder: Folder;
  isChecked: boolean;
}) => {
  return (
    <Link
      key={folder.id}
      href={`/?folderId=${folder.id}`}
      className="flex items-center gap-3 rounded-md bg-muted px-4 py-3 hover:bg-muted/50"
      // prefetch={false}
    >
      <FolderIcon className="h-6 w-6" />
      <div className="flex-1 truncate">{folder.name}</div>
      <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
};

export default SidebarFolders;
