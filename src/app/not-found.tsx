import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/marketing/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo className="h-8 w-auto" />
      <p className="mt-10 font-serif text-7xl font-semibold text-gold-gradient">
        404
      </p>
      <h1 className="mt-4 font-serif text-2xl font-semibold">
        Cette adresse n&apos;existe pas
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        La page que vous recherchez a peut-être été déplacée ou n&apos;est plus
        disponible.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="size-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/properties">
            <Search className="size-4" />
            Explorer les propriétés
          </Link>
        </Button>
      </div>
    </div>
  );
}
