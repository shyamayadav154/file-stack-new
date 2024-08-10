import { db } from "~/server/db";
import SingleFile from "./single-file";

async function ShowFiles({ folderId,folderName }: { folderId: string | undefined | string[],folderName: string}) {
  if (!folderId) {
    return <div>No folder selected</div>;
  }

  const data = await db.file.findMany({
    where: {
      folderId: Number(folderId),
    },
  });


  if (!folderId) {
    return <div>No folder selected</div>;
  }
  if (!data.length) {
    return <div>No files found</div>;
  }

  // const firstFile = data[0];
  // const buffer = firstFile.content;
  // const type = firstFile.type;
  // const base64 = Buffer.from(buffer).toString("base64");

  return (
    <div>
      {/* <h2 className="mb-4 text-lg font-medium">{folderName}</h2> */}
      <ul className="my-2  flex flex-col gap-2 w-full">
        {data.map((file) => (
          <li key={file.id} 
            className="pl-5 "
          >
            <SingleFile file={file} />
          </li>
        ))}
      </ul>
      {/* <Fileviewer base64={base64} type={type} /> */}
    </div>
  );
}

export default ShowFiles;
