import SideBar from "~/components/sidebar";

export default function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <main className="p-10 m-10 border min-h-[700px] rounded-md">
      <SideBar searchParams={searchParams} />
    </main>
  );
}
