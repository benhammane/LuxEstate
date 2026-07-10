"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAdminProperties } from "@/stores/admin-properties";
import { PropertyForm } from "@/components/admin/property-form";
import { Button } from "@/components/ui/button";

export default function EditPropertyPage() {
  const params = useParams<{ id: string }>();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const property = useAdminProperties((s) =>
    s.items.find((p) => p.id === params.id),
  );

  if (!mounted) {
    return <div className="h-64 animate-pulse rounded-2xl bg-muted" />;
  }

  if (!property) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-24 text-center">
        <h1 className="text-lg font-semibold">Annonce introuvable</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ce bien n&apos;existe plus.
        </p>
        <Button asChild className="mt-6">
          <Link href="/admin/properties">Retour aux annonces</Link>
        </Button>
      </div>
    );
  }

  return <PropertyForm existing={property} />;
}
