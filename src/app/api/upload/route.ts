import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const folderId = data.get("folderId");
  if(!folderId) {
    return NextResponse.json({ success: false,message: "Folder ID is required" });
  }
  const file: File | null = data.get("file");
  if (!file) {
    return NextResponse.json({ success: false,message: "File is required" });
  }

  try {
    // FIXME: Store in base64 format instead of bytes for better conversion in frontend
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes)

    // Save file to disk
    const path = `/tmp/${file.name}`;
    await writeFile(path, buffer);

    // Save file info to database
    const savedFile = await prisma.file.create({
      data: {
        folderId: Number(folderId),
        name: file.name,
        content: buffer,
        path: path,
        size: file.size,
        type: file.type,
      },
    });

    return NextResponse.json({ success: true, file: savedFile });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ success: false });
  }
}

// Visit https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config for more information.
