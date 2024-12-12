import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
// import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Custom, Providers } from "../Provider";
import Sidebar from "@/components/custom/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

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
