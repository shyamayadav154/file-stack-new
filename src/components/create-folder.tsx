import { createFolder } from "~/app/action";

function CreateFolder() {
  return (
    <form action={createFolder} className="flex flex-col gap-2">
      <input name="folderName" type="text" placeholder="Folder Name"  className="border p-2" />
      <button type="submit" className="border p-2">Create Folder</button>
    </form>
  );
}

export default CreateFolder;
