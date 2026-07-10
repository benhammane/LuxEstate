import { cn } from "@/lib/utils";

/** Bespoke LuxEstate wordmark: a stylised "roofline" monogram + serif type. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-full w-auto"
        aria-hidden="true"
      >
        <path
          d="M16 3 3 13v16h9V19h8v10h9V13L16 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          className="text-primary"
        />
        <path
          d="M16 3 3 13"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
        Lux<span className="text-gold-gradient">Estate</span>
      </span>
    </span>
  );
}
