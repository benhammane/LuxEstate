import type { Metadata } from "next";
import Link from "next/link";
import { isGoogleEnabled } from "@/auth";
import { RegisterForm } from "@/components/auth/register-form";
import { GoogleButton } from "@/components/auth/google-button";

export const metadata: Metadata = { title: "Créer un compte" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        Créer un compte
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Rejoignez LuxEstate pour suivre vos biens favoris et réserver des
        visites privées.
      </p>

      {isGoogleEnabled && (
        <>
          <div className="mt-8">
            <GoogleButton callbackUrl={callbackUrl} />
          </div>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </>
      )}

      <div className={isGoogleEnabled ? "" : "mt-8"}>
        <RegisterForm callbackUrl={callbackUrl} />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
