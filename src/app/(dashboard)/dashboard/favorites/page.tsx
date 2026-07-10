import type { Metadata } from "next";
import { FavoritesList } from "@/components/dashboard/favorites-list";

export const metadata: Metadata = { title: "Mes favoris" };

export default function FavoritesPage() {
  return <FavoritesList />;
}
