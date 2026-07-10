import type { Metadata } from "next";
import { auth } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Profil" };

function initials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function ProfilePage() {
  const session = await auth();
  const user = session!.user;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">Profil</h1>
        <p className="mt-1 text-muted-foreground">
          Gérez vos informations personnelles.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            {user.image && <AvatarImage src={user.image} />}
            <AvatarFallback className="text-lg">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <Badge variant={user.role === "ADMIN" ? "gold" : "muted"}>
                {user.role === "ADMIN" ? "Administrateur" : "Client"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <form className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" defaultValue={user.name ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" placeholder="+33 6 12 34 56 78" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city">Ville</Label>
            <Input id="city" placeholder="Paris" />
          </div>
          <div className="sm:col-span-2">
            <Button type="button">Enregistrer les modifications</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
