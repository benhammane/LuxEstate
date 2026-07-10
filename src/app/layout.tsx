import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Editorial serif for premium headlines
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LuxEstate — L'immobilier d'exception",
    template: "%s · LuxEstate",
  },
  description:
    "LuxEstate réunit les plus belles propriétés d'exception. Recherche avancée, visites privées et accompagnement sur-mesure par des conseillers dédiés.",
  keywords: [
    "immobilier de luxe",
    "propriétés d'exception",
    "villa",
    "appartement haut de gamme",
    "achat",
    "location",
  ],
  authors: [{ name: "Adamine" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "LuxEstate",
    title: "LuxEstate — L'immobilier d'exception",
    description:
      "Découvrez des propriétés d'exception et réservez vos visites privées.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxEstate — L'immobilier d'exception",
    description:
      "Découvrez des propriétés d'exception et réservez vos visites privées.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Aller au contenu principal
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
