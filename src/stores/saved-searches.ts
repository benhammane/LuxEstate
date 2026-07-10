"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedSearch {
  id: string;
  name: string;
  query: string; // URL search string, e.g. "listingType=SALE&type=Villa"
  createdAt: string;
}

interface SavedSearchesState {
  items: SavedSearch[];
  add: (name: string, query: string) => void;
  remove: (id: string) => void;
}

export const useSavedSearches = create<SavedSearchesState>()(
  persist(
    (set) => ({
      items: [],
      add: (name, query) =>
        set((s) => ({
          items: [
            {
              id: crypto.randomUUID(),
              name,
              query,
              createdAt: new Date().toISOString(),
            },
            ...s.items,
          ],
        })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
    }),
    { name: "luxestate-saved-searches" },
  ),
);
