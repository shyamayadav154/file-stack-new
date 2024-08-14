import { db } from "~/server/db";
import CreateFolder from "./create-folder";
import { AllFolders } from "./single-folder";

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
  

  // if (!data.length) {
  //   return <div>No folders found</div>;
  // }

  return (
    <div className="flex flex-col gap-5 p-2">
      <CreateFolder/>
      {/* <SidebarFolders folders={data}> */}
      {/*   <ShowFiles folderId={folderId} /> */}
      {/* </SidebarFolders> */}
      <AllFolders folders={data} />
    </div>
  );
}

export default SideBar;
