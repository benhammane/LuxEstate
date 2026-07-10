import type { Metadata } from "next";
import { PropertiesTable } from "@/components/admin/properties-table";

export const metadata: Metadata = { title: "Annonces · Admin" };

export default function AdminPropertiesPage() {
  return <PropertiesTable />;
}
