import { create } from "zustand";

interface PropertyUiState {
  activeId: string | null; // hovered/selected property (list ↔ map sync)
  setActiveId: (id: string | null) => void;
  view: "split" | "list" | "map"; // mobile view switcher
  setView: (view: PropertyUiState["view"]) => void;
}

export const usePropertyUi = create<PropertyUiState>((set) => ({
  activeId: null,
  setActiveId: (id) => set({ activeId: id }),
  view: "split",
  setView: (view) => set({ view }),
}));
