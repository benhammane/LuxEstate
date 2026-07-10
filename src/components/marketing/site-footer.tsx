import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/marketing/logo";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
} from "@/components/marketing/social-icons";

const columns = [
  {
    title: "Explorer",
    links: [
      { label: "Biens à vendre", href: "/properties?listingType=SALE" },
      { label: "Biens à louer", href: "/properties?listingType=RENT" },
      { label: "Nouveautés", href: "/properties?sort=recent" },
      { label: "Off-market", href: "/properties?confidential=1" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Nos conseillers", href: "/agents" },
      { label: "À propos", href: "/about" },
      { label: "Carrières", href: "/careers" },
      { label: "Presse", href: "/press" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Estimer mon bien", href: "/estimate" },
      { label: "Guide de l'acheteur", href: "/guides" },
      { label: "Prendre rendez-vous", href: "/contact" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo className="h-7 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Une maison dédiée à l'immobilier d'exception. Discrétion,
              exigence et accompagnement sur-mesure, en France et à
              l'international.
            </p>
            <div className="mt-6 flex gap-2">
              {[InstagramIcon, LinkedinIcon, FacebookIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Réseau social"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} LuxEstate. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="hover:text-foreground">
              Mentions légales
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Confidentialité
            </Link>
            <span className="text-muted-foreground/70">
              Conçu par{" "}
              <a
                href="https://adamine.dev"
                className="font-medium text-foreground/80 hover:text-primary"
              >
                Adamine
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
