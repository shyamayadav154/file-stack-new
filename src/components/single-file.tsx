"use client";
import React from "react";
import { type File } from "@prisma/client";

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
  return <span onClick={() => onFileClick(file)} className="truncate max-w-40">{file.name}</span>;
}

export default SingleFile;
