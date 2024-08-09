"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function FileUPloader({
  folderId,
}: {
  folderId: string | null;
}) {
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

  if (!folderId) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className=" min-w-[500px] max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Upload a file</CardTitle>
            <CardDescription>
              Drag and drop a file or click to select one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input type="file" name="file" onChange={handleFileChange} />
                <input type="hidden" name="folderId" value={folderId} />
                <Button type="submit">Upload</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      {/* <input type="hidden" name="folderId" value={folderId ?? ""} /> */}
      {/* <button type="submit">Upload</button> */}
    </section>
  );
}
