export const siteConfig = {
  name: "LuxEstate",
  tagline: "L'immobilier d'exception",
  description:
    "LuxEstate réunit les plus belles propriétés d'exception, avec un accompagnement sur-mesure.",
  nav: [
    { label: "Acheter", href: "/properties?listingType=SALE" },
    { label: "Louer", href: "/properties?listingType=RENT" },
    { label: "Nos conseillers", href: "/agents" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
