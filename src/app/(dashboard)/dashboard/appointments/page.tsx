import type { Metadata } from "next";
import { AppointmentsList } from "@/components/dashboard/appointments-list";

export const metadata: Metadata = { title: "Mes rendez-vous" };

export default function AppointmentsPage() {
  return <AppointmentsList />;
}
