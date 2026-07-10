import type { Metadata } from "next";
import Image from "next/image";
import { properties } from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Agents · Admin" };

export default function AdminAgentsPage() {
  const map = new Map<
    string,
    { name: string; title: string; photo: string; count: number; volume: number }
  >();
  for (const p of properties) {
    const a = p.agent;
    const cur = map.get(a.name) ?? {
      name: a.name,
      title: a.title,
      photo: a.photo,
      count: 0,
      volume: 0,
    };
    cur.count += 1;
    cur.volume += p.listingType === "SALE" ? p.price : 0;
    map.set(a.name, cur);
  }
  const agents = [...map.values()].sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">Agents</h1>
        <p className="mt-1 text-muted-foreground">
          {agents.length} conseillers actifs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {agents.map((a) => (
          <div key={a.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="relative size-14 overflow-hidden rounded-full">
                <Image src={a.photo} alt={a.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-medium">{a.name}</div>
                <div className="truncate text-sm text-muted-foreground">{a.title}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
              <div>
                <div className="font-semibold">{a.count}</div>
                <div className="text-xs text-muted-foreground">annonces</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {formatPrice(a.volume, { compact: true })}
                </div>
                <div className="text-xs text-muted-foreground">volume</div>
              </div>
              <Badge variant="success">Actif</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
