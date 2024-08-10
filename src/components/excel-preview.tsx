"use client";
import React, { useState } from "react";
import ExcelUploader from "./excel-uploader";

interface ExcelPreviewProps {
  data: Record<string, any>[] | null;
}

const ExcelPreview: React.FC<ExcelPreviewProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExcelPreview;

export const ExcelPreviewUploader: React.FC = () => {

  const [excelData, setExcelData] = useState<Record<string, any>[] | null>(
    null,
  );

  const handleFileLoaded = (data: Record<string, any>[]) => {
    setExcelData(data);
  };

  return (
    <div>
      <h1>Excel File Uploader and Preview</h1>
      <ExcelUploader onFileLoaded={handleFileLoaded} />
      <ExcelPreview data={excelData} />
    </div>
  );
};

