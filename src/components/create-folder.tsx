import { createFolder } from "~/app/action";

function CreateFolder() {
  return (
    <form action={createFolder} className="flex flex-col gap-2">
      <input name="folderName" type="text" placeholder="Add folder"  className="border p-2 rounded-md" />
      <button type="submit" className="border p-2 rounded-md">Create Folder</button>
    </form>
  );
}

export default CreateFolder;
