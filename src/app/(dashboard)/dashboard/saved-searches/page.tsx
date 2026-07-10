import type { Metadata } from "next";
import { SavedSearchesList } from "@/components/dashboard/saved-searches-list";

export const metadata: Metadata = { title: "Recherches enregistrées" };

export default function SavedSearchesPage() {
  return <SavedSearchesList />;
}
