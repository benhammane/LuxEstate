import type { Metadata } from "next";
import Link from "next/link";
import { isGoogleEnabled } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/google-button";

export const metadata: Metadata = { title: "Connexion" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        Bon retour
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Connectez-vous pour accéder à vos favoris et vos rendez-vous.
      </p>

      <div className="mt-8">
        <LoginForm callbackUrl={callbackUrl} />
      </div>

      {isGoogleEnabled && (
        <>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <GoogleButton callbackUrl={callbackUrl} />
        </>
      )}

      <div className="mt-6 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Compte démo :</span>{" "}
        demo@luxestate.fr / demo1234
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
