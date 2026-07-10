"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const [, setFilters] = usePropertyFilters();
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    setFilters({ page: p });
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5">
      <button
        onClick={() => go(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent disabled:opacity-40"
        aria-label="Page précédente"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
            p === page
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-accent",
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => go(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent disabled:opacity-40"
        aria-label="Page suivante"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
