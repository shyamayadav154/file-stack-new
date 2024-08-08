"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export default function FileUPloader({ folderId }: { folderId: number | undefined}) {
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData(e.currentTarget);
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`File uploaded successfully. File ID: `);
      } else {
        alert("File upload failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during file upload");
    }
  };

  return (
    <div>
      <h1>File Uploader</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="hidden" name="folderId" value={folderId} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
