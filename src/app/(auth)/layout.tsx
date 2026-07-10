import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/marketing/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo className="h-7 w-auto" />
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LuxEstate · Conçu par Adamine
        </p>
      </div>

      {/* Visual side */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="font-serif text-2xl font-medium leading-snug">
            « Chaque propriété raconte une histoire. Nous vous aidons à écrire la
            vôtre. »
          </blockquote>
          <p className="mt-3 text-sm text-white/70">
            LuxEstate — l'immobilier d'exception
          </p>
        </div>
      </div>
    </div>
  );
}
