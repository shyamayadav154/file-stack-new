"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Input } from "./ui/input";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function FileUPloader({
  folderId,
}: {
  folderId: string | null;
}) {
  const [file, setFile] = useState<File | undefined>();
  const formRef = useRef<HTMLFormElement>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // if (e.target.files) {
    //   setFile(e.target.files[0]);
    // }
    const formData = new FormData(formRef.current);
    if (!file) {
      return alert("Please select a file");
    }
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`File uploaded successfully. File ID: `);
        router.refresh();
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during file upload");
    }finally{
      setIsLoading(false);
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
        revalidatePath("/");
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
    <section className="flex w-full flex-col items-center justify-center">
      <div className="mt-5 grid w-full gap-4">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <label htmlFor="file-input">
            <div className={`rounded-md bg-black px-4 py-2 text-center text-white ${isLoading && "opacity-50 "}`}>
              {isLoading ? "Uploading..." : "Upload a file"}
            </div>
            <Input
              disabled={isLoading}
              id="file-input"
              className="hidden"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
          <input type="hidden" name="folderId" value={folderId} />
          {/* <Button type="submit"  className="w-full">Add file</Button> */}
        </form>
      </div>
    </section>
  );
}
