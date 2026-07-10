"use client";

import * as React from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  Building2,
  BadgeCheck,
  Eye,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { useAdminProperties } from "@/stores/admin-properties";
import { useAppointments } from "@/stores/appointments";
import { formatPrice, formatNumber } from "@/lib/utils";

const CHART_COLORS = ["#3452c9", "#c79a3f", "#4f8a5b", "#8a5cc9", "#c95c7a", "#4aa3c7"];

export function AdminOverview() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const items = useAdminProperties((s) => s.items);
  const appts = useAppointments((s) => s.items);

  const published = items.filter((p) => p.status === "PUBLISHED");
  const totalViews = items.reduce((s, p) => s + p.views, 0);
  const avgPrice = published.length
    ? Math.round(
        published.filter((p) => p.listingType === "SALE").reduce((s, p) => s + p.price, 0) /
          Math.max(1, published.filter((p) => p.listingType === "SALE").length),
      )
    : 0;

  const byType = Object.entries(
    items.reduce<Record<string, number>>((acc, p) => {
      acc[p.type] = (acc[p.type] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const byListing = [
    { name: "Vente", value: items.filter((p) => p.listingType === "SALE").length },
    { name: "Location", value: items.filter((p) => p.listingType === "RENT").length },
  ];

  const trend = [
    { m: "Fév", v: 6 },
    { m: "Mar", v: 9 },
    { m: "Avr", v: 8 },
    { m: "Mai", v: 12 },
    { m: "Juin", v: 15 },
    { m: "Juil", v: 18 },
  ];

  const kpis = [
    { label: "Annonces", value: formatNumber(items.length), icon: Building2, sub: `${published.length} publiées` },
    { label: "Prix moyen (vente)", value: formatPrice(avgPrice, { compact: true }), icon: TrendingUp, sub: "portefeuille" },
    { label: "Vues cumulées", value: formatNumber(totalViews), icon: Eye, sub: "30 derniers jours" },
    { label: "Rendez-vous", value: formatNumber(mounted ? appts.length : 0), icon: CalendarDays, sub: "à traiter" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Vue d&apos;ensemble
        </h1>
        <p className="mt-1 text-muted-foreground">
          Pilotez l&apos;activité de la plateforme en un coup d&apos;œil.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{k.label}</span>
              <k.icon className="size-5 text-primary" />
            </div>
            <div className="mt-3 font-serif text-2xl font-semibold">{k.value}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <BadgeCheck className="size-3.5 text-success" />
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold">Annonces ajoutées</h2>
          <p className="text-xs text-muted-foreground">6 derniers mois</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3452c9" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#3452c9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="v" stroke="#3452c9" strokeWidth={2} fill="url(#area)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Vente / Location</h2>
          <div className="mt-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byListing} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3}>
                  {byListing.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            {byListing.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold">Répartition par type de bien</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byType} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {byType.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-right">
        <Link href="/admin/properties" className="text-sm font-medium text-primary hover:underline">
          Gérer les annonces →
        </Link>
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lift">
      {label && <div className="font-medium">{label}</div>}
      {payload.map((p: any, i: number) => (
        <div key={i} className="text-muted-foreground">
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
