import type { Metadata } from "next";
import { PropertyForm } from "@/components/admin/property-form";

export const metadata: Metadata = { title: "Nouvelle annonce · Admin" };

export default function NewPropertyPage() {
  return <PropertyForm />;
}
