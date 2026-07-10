"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, X, Link2, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/**
 * Drag & drop image manager. Uses Cloudinary unsigned upload when configured,
 * and always supports adding images by URL so the demo works without keys.
 */
export function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [url, setUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);

  const cloudinaryEnabled = Boolean(CLOUD_NAME && UPLOAD_PRESET);

  function addUrl() {
    const u = url.trim();
    if (!u) return;
    try {
      new URL(u);
    } catch {
      toast.error("URL invalide");
      return;
    }
    onChange([...value, u]);
    setUrl("");
  }

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    if (!cloudinaryEnabled) {
      toast.info("Configurez Cloudinary pour l'upload de fichiers", {
        description: "En attendant, ajoutez vos photos par URL.",
      });
      return;
    }
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", UPLOAD_PRESET!);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: fd },
        );
        const data = await res.json();
        if (data.secure_url) uploaded.push(data.secure_url);
      }
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} image(s) ajoutée(s)`);
    } catch {
      toast.error("Échec de l'upload");
    } finally {
      setUploading(false);
    }
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function makeCover(i: number) {
    const next = [...value];
    const [img] = next.splice(i, 1);
    onChange([img, ...next]);
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          uploadFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border",
        )}
      >
        {uploading ? (
          <Loader2 className="size-6 animate-spin text-primary" />
        ) : (
          <UploadCloud className="size-6 text-muted-foreground" />
        )}
        <p className="mt-2 text-sm font-medium">
          Glissez-déposez vos photos
          {!cloudinaryEnabled && " (via URL ci-dessous)"}
        </p>
        <p className="text-xs text-muted-foreground">
          {cloudinaryEnabled
            ? "JPG, PNG ou WebP — optimisées via Cloudinary"
            : "L'upload de fichiers s'active en configurant Cloudinary"}
        </p>
        {cloudinaryEnabled && (
          <label className="mt-3">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadFiles(e.target.files)}
            />
            <span className="cursor-pointer text-sm font-medium text-primary hover:underline">
              Parcourir les fichiers
            </span>
          </label>
        )}
      </div>

      {/* Add by URL */}
      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3">
          <Link2 className="size-4 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="https://…/photo.jpg"
            className="h-10 border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <Button type="button" variant="secondary" onClick={addUrl}>
          Ajouter
        </Button>
      </div>

      {/* Gallery */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-gold-foreground">
                  Couverture
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeCover(i)}
                    className="inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-foreground"
                    aria-label="Définir comme couverture"
                  >
                    <Star className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-destructive"
                  aria-label="Retirer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
