# LuxEstate — L'immobilier d'exception

Plateforme immobilière haut de gamme (SaaS) : recherche avancée avec carte
interactive, fiches détaillées, favoris, prise de rendez-vous, espace client et
back-office d'administration complet.

> Projet vitrine développé par l'agence **Adamine** pour démontrer sa capacité à
> concevoir des plateformes web premium, performantes et évolutives.

---

## ✨ Fonctionnalités

- **Landing premium** — hero plein écran, recherche instantanée, statistiques
  animées, sélection signature, avis, conseillers, FAQ.
- **Recherche avancée** — filtres (prix, surface, type, chambres, équipements…)
  synchronisés à l'URL, tri, pagination, le tout filtré côté serveur.
- **Carte interactive** — MapLibre + clustering, popups, synchronisation
  liste ↔ carte, « rechercher dans cette zone ».
- **Fiche bien** — galerie plein écran + lightbox, DPE, localisation, agent,
  biens similaires, partage, favoris, données structurées schema.org.
- **Prise de rendez-vous** — calendrier, créneaux, choix du conseiller, emails
  de confirmation (React Email + Resend).
- **Authentification** — Auth.js (Credentials + Google), sessions JWT, RBAC.
- **Espace client** — favoris, rendez-vous, recherches enregistrées, profil,
  notifications.
- **Back-office admin** — dashboard analytique (Recharts), CRUD des annonces
  avec upload d'images (Cloudinary), gestion agents / utilisateurs / RDV / avis,
  paramètres — le tout réservé au rôle `ADMIN`.
- **Production-ready** — SEO (sitemap, robots, OpenGraph, JSON-LD), en-têtes de
  sécurité, rate limiting, accessibilité, dark mode, responsive.

## 🧱 Stack technique

| Domaine     | Technologies                                                |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack), React 19, TypeScript    |
| Style       | Tailwind CSS v4 (design system sur-mesure, tokens OKLCH)     |
| UI          | Radix UI, Framer Motion, Lucide, sonner                     |
| Données     | Prisma 6, PostgreSQL (schéma complet + seed)                |
| État        | TanStack Query, Zustand, nuqs                               |
| Formulaires | React Hook Form + Zod                                       |
| Auth        | Auth.js v5 (NextAuth)                                       |
| Carte       | MapLibre GL / react-map-gl (tuiles CARTO, Mapbox optionnel) |
| Emails      | Resend + React Email                                        |
| Médias      | Cloudinary                                                  |
| Graphiques  | Recharts                                                    |

## 🚀 Démarrage

```bash
npm install
cp .env.example .env   # renseigner AUTH_SECRET au minimum
npm run dev            # http://localhost:3000
```

L'application **fonctionne sans base de données ni clés externes** : elle
s'appuie sur un jeu de données de démonstration. Les intégrations (PostgreSQL,
Google, Mapbox, Cloudinary, Resend) s'activent en renseignant le `.env`.

### Comptes de démonstration

| Rôle   | Email                | Mot de passe |
| ------ | -------------------- | ------------ |
| Client | `demo@luxestate.fr`  | `demo1234`   |
| Admin  | `admin@luxestate.fr` | `admin1234`  |

### Base de données (optionnel)

```bash
# après avoir renseigné DATABASE_URL dans .env
npm run db:push     # applique le schéma Prisma
npm run db:seed     # importe le jeu de données
npm run db:studio   # explore la base
```

## 📁 Architecture

```
src/
├── app/
│   ├── (marketing)/     # landing & pages publiques
│   ├── (properties)/    # recherche, carte, fiches
│   ├── (auth)/          # connexion, inscription
│   ├── (dashboard)/     # espace client
│   ├── (admin)/         # back-office
│   └── api/             # route handlers (REST, Zod)
├── components/          # ui/ · marketing/ · property/ · map/ · dashboard/ · admin/
├── server/              # couche d'accès aux données
├── lib/ · hooks/ · stores/ · schemas/ · types/ · emails/
prisma/                  # schema.prisma · seed.ts
```

## 📄 Licence

Projet de démonstration — © Adamine. Tous droits réservés.
