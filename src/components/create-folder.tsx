import { createFolder } from "~/app/action";
import { cookies } from "next/headers";

function CreateFolder() {
  const cookieStore = cookies()
  const psw = cookieStore.get("psw")
  const hasAuth = psw?.value == '99991955'
  console.log({psw,hasAuth})

  if(!hasAuth){
    return null
  }

  return (
    <form action={createFolder} className="flex flex-col gap-2">
      <input name="folderName" type="text" placeholder="Add folder"  className="border p-2 rounded-md" />
      <button type="submit" className="border p-2 rounded-md">Create Folder</button>
    </form>
  );
}

export default CreateFolder;
