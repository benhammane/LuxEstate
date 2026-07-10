/**
 * Demo dataset used to render the marketing surfaces before the database
 * milestone. Replaced by Prisma-backed queries in M2. Images are served from
 * Unsplash (allow-listed in next.config).
 */

export type DemoProperty = {
  id: string;
  slug: string;
  title: string;
  city: string;
  district: string;
  price: number;
  listingType: "SALE" | "RENT";
  type: string;
  beds: number;
  baths: number;
  surface: number;
  image: string;
  featured?: boolean;
  isNew?: boolean;
};

export const demoProperties: DemoProperty[] = [
  {
    id: "1",
    slug: "villa-contemporaine-cap-ferrat",
    title: "Villa contemporaine vue mer",
    city: "Saint-Jean-Cap-Ferrat",
    district: "Presqu'île",
    price: 12500000,
    listingType: "SALE",
    type: "Villa",
    beds: 6,
    baths: 5,
    surface: 480,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    featured: true,
    isNew: true,
  },
  {
    id: "2",
    slug: "penthouse-triangle-dor-paris",
    title: "Penthouse Triangle d'Or",
    city: "Paris 8e",
    district: "Champs-Élysées",
    price: 8900000,
    listingType: "SALE",
    type: "Penthouse",
    beds: 4,
    baths: 3,
    surface: 260,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    id: "3",
    slug: "mas-provencal-luberon",
    title: "Mas provençal d'exception",
    city: "Gordes",
    district: "Luberon",
    price: 4200000,
    listingType: "SALE",
    type: "Propriété",
    beds: 5,
    baths: 4,
    surface: 390,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    id: "4",
    slug: "appartement-haussmannien-lyon",
    title: "Appartement haussmannien rénové",
    city: "Lyon 6e",
    district: "Foch",
    price: 1850000,
    listingType: "SALE",
    type: "Appartement",
    beds: 3,
    baths: 2,
    surface: 165,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
    isNew: true,
  },
  {
    id: "5",
    slug: "chalet-alpin-megeve",
    title: "Chalet alpin pieds des pistes",
    city: "Megève",
    district: "Mont d'Arbois",
    price: 32000,
    listingType: "RENT",
    type: "Chalet",
    beds: 5,
    baths: 5,
    surface: 320,
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "6",
    slug: "loft-industriel-bordeaux",
    title: "Loft industriel bord de Garonne",
    city: "Bordeaux",
    district: "Bacalan",
    price: 9500,
    listingType: "RENT",
    type: "Loft",
    beds: 2,
    baths: 2,
    surface: 140,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
  },
];

export const demoAgents = [
  {
    name: "Camille Auriol",
    role: "Directrice, Côte d'Azur",
    sales: "120+ ventes",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Julien Marchand",
    role: "Conseiller senior, Paris",
    sales: "95+ ventes",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Inès Bellamy",
    role: "Spécialiste résidences alpines",
    sales: "80+ ventes",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Thomas Rivière",
    role: "Conseiller, Sud-Ouest",
    sales: "70+ ventes",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

export const demoTestimonials = [
  {
    quote:
      "Un accompagnement d'une élégance rare. LuxEstate a compris nos attentes en une visite et conclu la vente en trois semaines.",
    name: "Hélène & Marc D.",
    detail: "Vente d'une villa, Saint-Tropez",
  },
  {
    quote:
      "La plateforme est superbe et l'équipe encore plus. Chaque bien proposé correspondait exactement à notre recherche.",
    name: "Alexandre P.",
    detail: "Acquisition penthouse, Paris",
  },
  {
    quote:
      "Discrétion, réactivité, sens du détail. On sent une maison qui vise l'excellence à chaque étape.",
    name: "Sofia R.",
    detail: "Location saisonnière, Megève",
  },
];

export const demoFaq = [
  {
    q: "Comment se déroule une visite privée ?",
    a: "Vous réservez un créneau en ligne avec le conseiller de votre choix. La visite est individuelle, sur rendez-vous, et peut être organisée en présentiel ou en visioconférence pour les clients internationaux.",
  },
  {
    q: "Proposez-vous un accompagnement pour les acquéreurs étrangers ?",
    a: "Oui. Notre équipe multilingue vous accompagne sur les aspects juridiques, fiscaux et financiers, en coordination avec des notaires et conseillers patrimoniaux partenaires.",
  },
  {
    q: "Mes biens sont-ils diffusés de façon confidentielle ?",
    a: "Nous proposons des mandats confidentiels (off-market) réservés à un cercle d'acquéreurs qualifiés, sans diffusion publique de l'adresse ni des photographies sensibles.",
  },
  {
    q: "Quels sont vos honoraires ?",
    a: "Nos honoraires sont transparents et communiqués avant tout mandat. Ils varient selon le type de mission (vente, location, recherche dédiée) et la valeur du bien.",
  },
];

export const demoStats = [
  { value: 1250, suffix: "+", label: "Propriétés vendues" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 42, suffix: "", label: "Conseillers experts" },
  { value: 18, suffix: " pays", label: "Acquéreurs internationaux" },
];
