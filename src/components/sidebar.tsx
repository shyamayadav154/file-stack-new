import { db } from "~/server/db";
import SidebarFolders from "./sidebar-folder";
import ShowFiles from "./show-files";

async function SideBar({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const folderId = searchParams.folderId;
  const data = await db.folder.findMany({
    include: {
      children: true,
    },
  });

  if(!data.length){
    return <div>No folders found</div>;
  }

  return (
    <SidebarFolders files={data}>
      <ShowFiles  folderId={folderId} />
    </SidebarFolders>
  );
}

export default SideBar;
