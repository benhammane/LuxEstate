"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { propertyFormSchema, type PropertyFormValues } from "@/schemas/property";
import { useAdminProperties } from "@/stores/admin-properties";
import { AMENITIES } from "@/lib/data/amenities";
import { demoAgents } from "@/lib/demo-data";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { Property } from "@/types/property";

const TYPES = ["Villa", "Appartement", "Penthouse", "Maison", "Chalet", "Loft", "Propriété", "Terrain"] as const;
const STATUSES = [
  { value: "DRAFT", label: "Brouillon" },
  { value: "PENDING", label: "En attente" },
  { value: "PUBLISHED", label: "Publié" },
  { value: "SOLD", label: "Vendu" },
  { value: "RENTED", label: "Loué" },
] as const;

export function PropertyForm({ existing }: { existing?: Property }) {
  const router = useRouter();
  const upsert = useAdminProperties((s) => s.upsert);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: existing
      ? {
          ...existing,
          amenities: existing.amenities,
          images: existing.images,
        }
      : {
          listingType: "SALE",
          type: "Villa",
          status: "DRAFT",
          bedrooms: 0,
          bathrooms: 0,
          featured: false,
          confidential: false,
          region: "Provence-Alpes-Côte d'Azur",
          latitude: 43.7,
          longitude: 7.26,
          images: [],
          amenities: [],
        },
  });

  function onSubmit(values: PropertyFormValues) {
    const property: Property = {
      id: existing?.id ?? crypto.randomUUID(),
      slug: existing?.slug ?? slugify(values.title),
      currency: "EUR",
      isNew: existing?.isNew ?? true,
      views: existing?.views ?? 0,
      agent: existing?.agent ?? {
        name: demoAgents[0].name,
        title: demoAgents[0].role,
        photo: demoAgents[0].image,
      },
      ...values,
    };
    upsert(property);
    toast.success(existing ? "Annonce mise à jour" : "Annonce créée");
    router.push("/admin/properties");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="size-9">
          <Link href="/admin/properties">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-2xl font-semibold">
            {existing ? "Modifier l'annonce" : "Nouvelle annonce"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Renseignez les informations du bien.
          </p>
        </div>
      </div>

      <Section title="Informations principales">
        <div className="grid gap-4">
          <Field label="Titre" error={errors.title?.message}>
            <Input {...register("title")} placeholder="Villa contemporaine vue mer" />
          </Field>
          <Field label="Description" error={errors.description?.message}>
            <Textarea rows={5} {...register("description")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Transaction">
              <select {...register("listingType")} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm">
                <option value="SALE">Vente</option>
                <option value="RENT">Location</option>
              </select>
            </Field>
            <Field label="Type de bien">
              <select {...register("type")} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm">
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Statut">
              <select {...register("status")} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm">
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Caractéristiques">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Prix (€)" error={errors.price?.message}>
            <Input type="number" {...register("price")} />
          </Field>
          <Field label="Surface (m²)" error={errors.surface?.message}>
            <Input type="number" {...register("surface")} />
          </Field>
          <Field label="Terrain (m²)">
            <Input type="number" {...register("landSize")} />
          </Field>
          <Field label="Chambres">
            <Input type="number" {...register("bedrooms")} />
          </Field>
          <Field label="Salles de bain">
            <Input type="number" {...register("bathrooms")} />
          </Field>
          <Field label="Année de construction">
            <Input type="number" {...register("yearBuilt")} />
          </Field>
          <Field label="DPE">
            <select {...register("energyRating")} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm">
              <option value="">—</option>
              {["A", "B", "C", "D", "E", "F", "G"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="Localisation">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ville" error={errors.city?.message}>
            <Input {...register("city")} />
          </Field>
          <Field label="Quartier" error={errors.district?.message}>
            <Input {...register("district")} />
          </Field>
          <Field label="Région" error={errors.region?.message}>
            <Input {...register("region")} />
          </Field>
          <Field label="Code postal">
            <Input {...register("postalCode")} />
          </Field>
          <Field label="Latitude" error={errors.latitude?.message}>
            <Input type="number" step="any" {...register("latitude")} />
          </Field>
          <Field label="Longitude" error={errors.longitude?.message}>
            <Input type="number" step="any" {...register("longitude")} />
          </Field>
        </div>
      </Section>

      <Section title="Photos">
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <ImageUploader value={field.value ?? []} onChange={field.onChange} />
          )}
        />
        {errors.images && (
          <p className="mt-2 text-xs text-destructive">{errors.images.message as string}</p>
        )}
      </Section>

      <Section title="Équipements">
        <Controller
          control={control}
          name="amenities"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map((a) => {
                const checked = field.value?.includes(a.slug);
                return (
                  <label key={a.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => {
                        const set = new Set(field.value ?? []);
                        if (v) set.add(a.slug);
                        else set.delete(a.slug);
                        field.onChange([...set]);
                      }}
                    />
                    <a.icon className="size-4 text-muted-foreground" />
                    {a.name}
                  </label>
                );
              })}
            </div>
          )}
        />
      </Section>

      <Section title="Mise en avant">
        <div className="space-y-4">
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <ToggleRow
                label="Bien signature"
                description="Mis en avant sur la page d'accueil."
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="confidential"
            render={({ field }) => (
              <ToggleRow
                label="Off-market"
                description="Diffusion confidentielle, sans adresse publique."
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </Section>

      <div className="flex justify-end gap-3">
        <Button asChild variant="secondary">
          <Link href="/admin/properties">Annuler</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {existing ? "Enregistrer" : "Publier l'annonce"}
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-5 font-serif text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
