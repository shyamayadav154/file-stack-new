"use client";
import React, { useState } from "react";
import { type File } from "@prisma/client";
import { DownloadIcon, FileIcon } from "lucide-react";
import ExcelPreview, { ExcelPreviewUploader } from "./excel-preview";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";

const processExcelFile = (data: string | ArrayBuffer) => {
  const workbook = XLSX.read(data, { type: "binary" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  return jsonData;
};

function SingleFile({ file }: { file: File }) {
  const [excelData, setExcelData] = useState<Record<string, any>[] | null>(
    null,
  );

  const previewExcelFile = (file: File) => {
    const buffer = file.content;

    const base64 = Buffer.from(buffer).toString("base64");
    const binaryString = atob(base64);
    const data = processExcelFile(binaryString);
    setExcelData(data);
  };

  const onFileClick = async (file: File) => {
    const buffer = file.content;

    const base64 = Buffer.from(buffer).toString("base64");
    // const binaryString = atob(base64);
    // const data = processExcelFile(binaryString);
    // setExcelData(data);

    // setExcelData(jsonData);
    // setExcelData(base64);

    // const base64 = buffer
    const filename = file.name;
    const link = document.createElement("a");
    const uri = `data:${file.type};base64,${base64}`;
    link.href = uri;
    link.href = `data:${file.type};base64,${base64}`;
    link.download = filename;
    link.click();
    // URL.revokeObjectURL(url);

    // Programmatically click the link to trigger the download
    // link.click();

    // Clean up by revoking the URL
    // URL.revokeObjectURL(url);
  };
  return (
    <div>
      <div className="flex items-center rounded-md bg-muted px-4 py-3 hover:bg-muted/50 justify-between">
        <div
          onClick={() => previewExcelFile(file)}
          className="flex items-center gap-3"
        >
          <FileIcon className="h-5 w-5 flex-shrink-0" />
          <p className="truncate text-wrap">{file.name}</p>
        </div>
        <DownloadIcon
          onClick={() => onFileClick(file)}
          className="h-5 w-5 flex-shrink-0"
        />
      </div>
      {excelData && (
        <div>
          <div>
            <Button onClick={() => setExcelData(null)}>
              Remove preview
            </Button>
          </div>

          <ExcelPreview data={excelData} />
        </div>
      )}
    </div>
  );
}

export default SingleFile;
