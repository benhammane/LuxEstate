"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

export const PropertyLocationMap = dynamic(
  () =>
    import("./property-location-map").then((m) => m.PropertyLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-border bg-muted">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    ),
  },
);
