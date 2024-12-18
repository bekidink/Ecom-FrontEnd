import Sidebar from "@/components/custom/Sidebar";





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar  />
      <div className="flex flex-col">
        {/* <Navbar role={user?.role ?? "USER"} /> */}
        <div className="flex min-h-screen w-full flex-col">{children}</div>
      </div>
    </div>
  );
}
