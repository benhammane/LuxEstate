"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ShareButton({ title }: { title: string }) {
  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Lien copié dans le presse-papier");
  }

  return (
    <Button variant="outline" size="sm" onClick={share}>
      <Share2 className="size-4" />
      Partager
    </Button>
  );
}
