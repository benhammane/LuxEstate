"use client";

import * as React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [toggles, setToggles] = React.useState({
    publicListings: true,
    allowRegistration: true,
    maintenance: false,
    emailNotifications: true,
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Paramètres
        </h1>
        <p className="mt-1 text-muted-foreground">
          Configuration générale de la plateforme.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Identité</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Nom de la plateforme</Label>
            <Input defaultValue="LuxEstate" />
          </div>
          <div className="space-y-1.5">
            <Label>Email de contact</Label>
            <Input defaultValue="contact@luxestate.fr" />
          </div>
          <div className="space-y-1.5">
            <Label>Devise</Label>
            <Input defaultValue="EUR (€)" />
          </div>
          <div className="space-y-1.5">
            <Label>Téléphone</Label>
            <Input defaultValue="+33 1 84 00 00 00" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-semibold">Fonctionnalités</h2>
        <div className="space-y-4">
          {[
            { key: "publicListings", label: "Annonces publiques", desc: "Rendre les annonces visibles sans connexion." },
            { key: "allowRegistration", label: "Inscriptions ouvertes", desc: "Autoriser la création de nouveaux comptes." },
            { key: "emailNotifications", label: "Notifications email", desc: "Envoyer les confirmations par email." },
            { key: "maintenance", label: "Mode maintenance", desc: "Afficher une page de maintenance au public." },
          ].map((t) => (
            <div key={t.key} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
              <Switch
                checked={toggles[t.key as keyof typeof toggles]}
                onCheckedChange={(v) =>
                  setToggles((s) => ({ ...s, [t.key]: v }))
                }
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Paramètres enregistrés")}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
