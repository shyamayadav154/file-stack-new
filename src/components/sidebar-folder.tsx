"use client";
import { type File } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import CreateFolder from "./create-folder";
import FileUPloader from "./file-uploader";
import { FolderIcon } from "lucide-react";

function SidebarFolders({
  files,
  children,
}: {
  files: File[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  console.log({ selectFolderId: folderId, searchParams });

  return (
    <main className="grid min-h-[500px] grid-cols-[300px_1fr]  rounded-md border divide-x-2">
      <section className="flex flex-col justify-between p-2">
        <div className="flex flex-col gap-1">
          {files.map((folder) => {
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
  );
}

export default SidebarFolders;
