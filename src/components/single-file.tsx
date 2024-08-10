"use client";
import React from "react";
import { type File } from "@prisma/client";
import { FileIcon } from "lucide-react";

function SingleFile({ file }: { file: File }) {
  const onFileClick = async (file: File) => {
    const buffer = file.content;

    const base64 = Buffer.from(buffer).toString("base64");

    // const base64 = buffer
    const filename = file.name;
    const link = document.createElement("a");
    const uri = `data:${file.type};base64,${base64}`;
    link.href = uri;
    // link.href = `data:${file.type};base64,${base64}`;
    link.download = filename;
    link.click();
    // URL.revokeObjectURL(url);

    // Programmatically click the link to trigger the download
    // link.click();

    // Clean up by revoking the URL
    // URL.revokeObjectURL(url);
  };
  return (
    <div
      onClick={() => onFileClick(file)}
      className="flex items-center gap-3 rounded-md bg-muted px-4 py-3 hover:bg-muted/50 "
    >
      <FileIcon className="h-5 w-5 flex-shrink-0" />
      <p className="truncate text-wrap">{file.name}</p>
    </div>
  );
}

export default SingleFile;
