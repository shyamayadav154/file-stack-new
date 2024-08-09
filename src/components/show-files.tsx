import { db } from "~/server/db";
import SingleFile from "./single-file";

async function ShowFiles({ folderId }: { folderId: string | undefined }) {
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
      <h2 className="mb-4 text-lg font-medium">Documents</h2>
      <ul className="my-2">
        {data.map((file) => (
          <li key={file.id} className="ml-5">
            <SingleFile file={file} />
          </li>
        ))}
      </ul>
      {/* <Fileviewer base64={base64} type={type} /> */}
    </div>
  );
}

export default ShowFiles;
