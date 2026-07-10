"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  CalendarDays,
  Bookmark,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dashboardNav = [
  { label: "Aperçu", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Favoris", href: "/dashboard/favorites", icon: Heart },
  { label: "Rendez-vous", href: "/dashboard/appointments", icon: CalendarDays },
  {
    label: "Recherches",
    href: "/dashboard/saved-searches",
    icon: Bookmark,
  },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Profil", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {dashboardNav.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
