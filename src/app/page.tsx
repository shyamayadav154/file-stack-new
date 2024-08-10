import { ExcelPreviewUploader } from "~/components/excel-preview";
import { FileExplorer } from "~/components/file-explorer";
import SideBar from "~/components/sidebar";

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      <SideBar searchParams={searchParams} />
      <ExcelPreviewUploader/>
    </>
  );
}
