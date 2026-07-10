"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { properties as seed } from "@/lib/data/properties";
import type { Property } from "@/types/property";

interface AdminPropertiesState {
  items: Property[];
  upsert: (property: Property) => void;
  remove: (id: string) => void;
  setStatus: (id: string, status: Property["status"]) => void;
  reset: () => void;
}

/**
 * Admin-side properties store, seeded from the demo dataset and persisted to
 * localStorage so create/edit/delete visibly work during the demo. With a
 * database, these become Prisma mutations behind the same actions.
 */
export const useAdminProperties = create<AdminPropertiesState>()(
  persist(
    (set) => ({
      items: seed,
      upsert: (property) =>
        set((s) => {
          const idx = s.items.findIndex((p) => p.id === property.id);
          if (idx === -1) return { items: [property, ...s.items] };
          const next = [...s.items];
          next[idx] = property;
          return { items: next };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((p) => p.id !== id) })),
      setStatus: (id, status) =>
        set((s) => ({
          items: s.items.map((p) => (p.id === id ? { ...p, status } : p)),
        })),
      reset: () => set({ items: seed }),
    }),
    { name: "luxestate-admin-properties", version: 1 },
  ),
);
