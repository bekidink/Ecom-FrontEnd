"use client";
import {
  Bell,
  AlignJustify,
  Home,
  Mail,
  ChartBarStacked,
  Layers,
  Plus,
  User2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Sidebar() {
  //   const categories = (await getCategories()) || [];
  const user = useSelector((state: RootState) => state?.user);
  const pathname = usePathname();
  const role = user.role;
  const roles:any = {
    USER: [
      {
        name: "Address",
        path: "/dashboard/address",
        icon: Home,
      },

      {
        name: "My Orders",
        path: "/dashboard/myorders",
        icon: Mail,
      },

      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: User2,
      },
    ],
    ADMIN: [
      {
        name: "Category",
        path: "/dashboard/category",
        icon: ChartBarStacked,
      },
      {
        name: "Sub Category",
        path: "/dashboard/subcategory",
        icon: Layers,
      },
      {
        name: "Product",
        path: "/dashboard/product",
        icon: AlignJustify,
      },
      {
        name: "Add Product",
        path: "/dashboard/upload-product",
        icon: Plus,
      },

      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: User2,
      },
    ],
  };
  const sidebarLinks = role ? roles[role] : [];
  // const sidebarLinks = [
  //   {
  //     name: "Dashboard",
  //     path: "/dashboard",
  //     icon: Home,
  //   },
  //   {
  //     name: "Category",
  //     path: "/dashboard/category",
  //     icon: AlarmClock,
  //   },
  //   {
  //     name: "Sub Category",
  //     path: "/dashboard/subcategory",
  //     icon: Mail,
  //   },
  //   {
  //     name: "Product",
  //     path: "/dashboard/product",
  //     icon: Mail,
  //   },
  //   {
  //     name: "Add Product",
  //     path: "/dashboard/upload-product",
  //     icon: Mail,
  //   },
  //   {
  //     name: "My Orders",
  //     path: "/dashboard/myorders",
  //     icon: Mail,
  //   },

  //   {
  //     name: "Profile",
  //     path: "/dashboard/profile",
  //     icon: Mail,
  //   },
  // ];

  const router = useRouter();

  async function handleLogout() {
    router.push("/");
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          {/* <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">EthioMedic</span>
          </Link> */}
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sidebarLinks.map((item:any, i:any) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path ? "bg-muted text-primary" : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button onClick={handleLogout} size="sm" className="w-full">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
