"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppointmentStatus = "CONFIRMED" | "CANCELLED";

export interface Appointment {
  id: string;
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
  propertyImage: string;
  agentName: string;
  date: string; // ISO
  slot: string; // e.g. "14:00"
  status: AppointmentStatus;
  createdAt: string;
}

interface AppointmentsState {
  items: Appointment[];
  add: (a: Omit<Appointment, "id" | "createdAt" | "status">) => Appointment;
  cancel: (id: string) => void;
  remove: (id: string) => void;
}

/** Client-side appointments (localStorage). Swaps to the `Appointment` table with the DB. */
export const useAppointments = create<AppointmentsState>()(
  persist(
    (set) => ({
      items: [],
      add: (a) => {
        const appt: Appointment = {
          ...a,
          id: crypto.randomUUID(),
          status: "CONFIRMED",
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ items: [appt, ...s.items] }));
        return appt;
      },
      cancel: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, status: "CANCELLED" } : i,
          ),
        })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
    }),
    { name: "luxestate-appointments" },
  ),
);
