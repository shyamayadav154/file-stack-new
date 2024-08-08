"use client";
import { type File } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import CreateFolder from "./create-folder";
import FileUPloader from "./file-uploader";

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

  // const [selectFolderId, setSelectFolder] = useQueryState<number | undefined>(
  //   "folderId",
  // );
  return (
    <main className="grid min-h-[500px] grid-cols-[300px_1fr] gap-5 rounded-md border p-2">
      <section className="flex flex-col justify-between border-r">
        <div>
          {files.map((folder) => {
            return (
              <div
                onClick={() => {
                  // setSelectFolder(folder.id);
                  // searchParams.set("folderId", folder.id.toString());
                  void router.push(`?folderId=${folder.id}`);
                }}
                className={`border p-2 ${folderId == folder.id && "bg-green-800 text-green-200"}`}
                key={folder.id}
              >
                {folder.name}
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
