"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  CalendarDays,
  Settings,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const adminNav = [
  { label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Annonces", href: "/admin/properties", icon: Building2 },
  { label: "Agents", href: "/admin/agents", icon: UserCog },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Rendez-vous", href: "/admin/appointments", icon: CalendarDays },
  { label: "Avis", href: "/admin/reviews", icon: Star },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {adminNav.map((item) => {
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
                ? "bg-primary text-primary-foreground"
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
