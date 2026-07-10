"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAdminProperties } from "@/stores/admin-properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import type { PropertyStatus } from "@/types/property";

const STATUS: Record<PropertyStatus, { label: string; variant: "default" | "gold" | "success" | "muted" | "outline" }> = {
  PUBLISHED: { label: "Publié", variant: "success" },
  DRAFT: { label: "Brouillon", variant: "muted" },
  PENDING: { label: "En attente", variant: "gold" },
  SOLD: { label: "Vendu", variant: "outline" },
  RENTED: { label: "Loué", variant: "outline" },
};

export function PropertiesTable() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { items, remove } = useAdminProperties();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<PropertyStatus | "ALL">("ALL");

  const filtered = (mounted ? items : []).filter((p) => {
    if (status !== "ALL" && p.status !== status) return false;
    if (q && !`${p.title} ${p.city}`.toLowerCase().includes(q.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
            Annonces
          </h1>
          <p className="mt-1 text-muted-foreground">
            {mounted ? items.length : 0} biens au portefeuille.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="size-4" />
            Nouvelle annonce
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par titre ou ville..."
            className="h-10 w-full min-w-40 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {(["ALL", "PUBLISHED", "DRAFT", "SOLD"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                status === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s === "ALL" ? "Tous" : STATUS[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Bien</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Prix</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Vues</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-accent/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.title}</div>
                        <div className="text-xs text-muted-foreground">{p.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.type}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(p.price, { compact: true })}</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS[p.status].variant}>{STATUS[p.status].label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.views.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/properties/${p.slug}`} className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Prévisualiser">
                        <Eye className="size-4" />
                      </Link>
                      <Link href={`/admin/properties/${p.id}/edit`} className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Modifier">
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        onClick={() => {
                          remove(p.id);
                          toast("Annonce supprimée");
                        }}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    Aucune annonce ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
