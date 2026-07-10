import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(3, "Titre requis"),
  description: z.string().min(20, "Description trop courte"),
  listingType: z.enum(["SALE", "RENT"]),
  type: z.enum([
    "Villa",
    "Appartement",
    "Penthouse",
    "Maison",
    "Chalet",
    "Loft",
    "Propriété",
    "Terrain",
  ]),
  status: z.enum(["DRAFT", "PENDING", "PUBLISHED", "SOLD", "RENTED"]),
  price: z.coerce.number().min(1, "Prix requis"),
  surface: z.coerce.number().min(1, "Surface requise"),
  landSize: z.coerce.number().optional(),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  yearBuilt: z.coerce.number().optional(),
  energyRating: z.enum(["A", "B", "C", "D", "E", "F", "G"]).optional(),
  city: z.string().min(1, "Ville requise"),
  district: z.string().min(1, "Quartier requis"),
  region: z.string().min(1, "Région requise"),
  postalCode: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  featured: z.boolean().default(false),
  confidential: z.boolean().default(false),
  images: z.array(z.string().url()).min(1, "Ajoutez au moins une photo"),
  amenities: z.array(z.string()).default([]),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
