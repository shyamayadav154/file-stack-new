'use server'

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function createFolder(formData: FormData) {
    const folderName = formData.get("folderName");

    if (typeof folderName !== "string") {
      return NextResponse.json({ success: false,message: "Folder name is required" });
    }
    await db.folder.create({
      data: {
        name: folderName,
      },
    });
    revalidatePath("/");
  }

export async function uploadFile(formData: FormData) {
  const folderId = formData.get("folderId");
  if (!folderId) {
    return NextResponse.json({ success: false,message: "Folder ID is required" });
  }
  const file: File | null = formData.get("file");
  if (!file) {
    return NextResponse.json({ success: false,message: "File is required" });
  }

  try {
    // FIXME: Store in base64 format instead of bytes for better conversion in frontend
    const bytes = await file.arrayBuffer(); 
    const buffer = Buffer.from(bytes)

    // Save file to disk
    const path = `/tmp/${file.name}`;
    // await writeFile(path, buffer);

    // Save file info to database
    const savedFile = await db.file.create({
      data: {
        folderId: Number(folderId),
        name: file.name,
        content: buffer,
        path: path,
        size: file.size,
        type: file.type,
      },
    }); 
    revalidatePath("/");
  } catch (error) {
    console.log({ error });
    return alert("An error occurred during file upload");
  }
}

