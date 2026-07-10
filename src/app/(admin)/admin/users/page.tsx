import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Utilisateurs · Admin" };

const USERS = [
  { name: "Client Démo", email: "demo@luxestate.fr", role: "CLIENT", joined: "2026-06-12", status: "Actif" },
  { name: "Administrateur", email: "admin@luxestate.fr", role: "ADMIN", joined: "2026-01-04", status: "Actif" },
  { name: "Hélène Dupont", email: "helene.d@email.com", role: "CLIENT", joined: "2026-06-28", status: "Actif" },
  { name: "Marc Lefevre", email: "marc.l@email.com", role: "CLIENT", joined: "2026-07-01", status: "Actif" },
  { name: "Sofia Rossi", email: "sofia.r@email.com", role: "CLIENT", joined: "2026-07-03", status: "Invité" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Utilisateurs
        </h1>
        <p className="mt-1 text-muted-foreground">{USERS.length} comptes.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Rôle</th>
                <th className="px-4 py-3 font-medium">Inscription</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {USERS.map((u) => (
                <tr key={u.email} className="hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === "ADMIN" ? "gold" : "muted"}>
                      {u.role === "ADMIN" ? "Administrateur" : "Client"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(u.joined).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.status === "Actif" ? "success" : "outline"}>
                      {u.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
