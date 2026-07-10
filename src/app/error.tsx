"use client";

import * as React from "react";
import { RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Report to your monitoring service (Sentry, etc.) here.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl font-semibold">
        Une erreur est survenue
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Nous sommes désolés, quelque chose s&apos;est mal passé. Réessayez ou
        revenez à l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw className="size-4" />
          Réessayer
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="size-4" />
            Accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
