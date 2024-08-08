import { db } from "~/server/db";
import SingleFile from "./single-file";

async function ShowFiles({folderId}: {folderId: number | undefined}) {

  if(!folderId){
    return <div>No folder selected</div>;
  }

  const data = await db.file.findMany({
    where:{
      folderId:Number(folderId)
    }
  });

  if (!data.length) {
    return <div>No files found</div>;
  }



  // const firstFile = data[0];
  // const buffer = firstFile.content;
  // const type = firstFile.type;
  // const base64 = Buffer.from(buffer).toString("base64");

  return (
    <div>
      <h1>Files</h1>
      <ul className="my-2">
        {data.map((file) => (
          <li key={file.id} className="border p-2 rounded-md">
            <SingleFile file={file} />
          </li>
        ))}
      </ul>
      {/* <Fileviewer base64={base64} type={type} /> */}
    </div>
  );
}

export default ShowFiles;
