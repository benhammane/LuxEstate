import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Logo } from "@/components/marketing/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Badge } from "@/components/ui/badge";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-muted/30 lg:flex">
          <div className="flex h-16 items-center gap-2 border-b border-border px-5">
            <Link href="/">
              <Logo className="h-6 w-auto" />
            </Link>
            <Badge variant="gold" className="ml-1">
              Admin
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <AdminSidebar />
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <span className="text-sm text-muted-foreground">
                Console d&apos;administration
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <UserMenu />
              </div>
            </div>
          </header>
          <main className="p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
