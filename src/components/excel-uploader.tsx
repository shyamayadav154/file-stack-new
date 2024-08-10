'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

interface ExcelUploaderProps {
  onFileLoaded: (data: any[]) => void;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onFileLoaded }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      onFileLoaded(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }, [onFileLoaded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop an Excel file here, or click to select one</p>
    </div>
  );
};

export default ExcelUploader;
