import { ExcelPreviewUploader } from "~/components/excel-preview";
import SideBar from "~/components/sidebar";
import StorageWrapper from "~/components/storag-wrappter";

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      <SideBar searchParams={searchParams} />
      <ExcelPreviewUploader/>
      <StorageWrapper/>
    </>
  );
}
