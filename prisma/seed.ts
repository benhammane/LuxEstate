/**
 * Seed script — mirrors the demo dataset into PostgreSQL.
 * Run with: `npm run db:seed` (after `npm run db:push`).
 */
import {
  PrismaClient,
  ListingType,
  PropertyType,
  PropertyStatus,
  EnergyRating,
  UserRole,
} from "@prisma/client";
import { properties } from "../src/lib/data/properties";
import { AMENITIES } from "../src/lib/data/amenities";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();

const TYPE_MAP: Record<string, PropertyType> = {
  Villa: PropertyType.VILLA,
  Appartement: PropertyType.APARTMENT,
  Penthouse: PropertyType.PENTHOUSE,
  Maison: PropertyType.HOUSE,
  Chalet: PropertyType.CHALET,
  Loft: PropertyType.LOFT,
  Propriété: PropertyType.MANSION,
  Terrain: PropertyType.LAND,
};

async function main() {
  console.log("🌱 Seeding LuxEstate…");

  // Amenities
  for (const a of AMENITIES) {
    await prisma.amenity.upsert({
      where: { slug: a.slug },
      update: { name: a.name },
      create: { slug: a.slug, name: a.name },
    });
  }

  // Agents (each backed by a user)
  const agents = new Map<string, string>(); // name -> agentId
  for (const p of properties) {
    const a = p.agent;
    if (agents.has(a.name)) continue;
    const email = `${slugify(a.name)}@luxestate.demo`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: a.name,
        role: UserRole.AGENT,
        image: a.photo,
        phone: a.phone,
      },
    });
    const agent = await prisma.agent.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        slug: slugify(a.name),
        title: a.title,
        photo: a.photo,
        phone: a.phone,
      },
    });
    agents.set(a.name, agent.id);
  }

  // Cities + districts
  const cities = new Map<string, string>();
  const districts = new Map<string, string>();
  for (const p of properties) {
    if (!cities.has(p.city)) {
      const city = await prisma.city.upsert({
        where: { slug: slugify(p.city) },
        update: {},
        create: {
          name: p.city,
          slug: slugify(p.city),
          region: p.region,
          latitude: p.latitude,
          longitude: p.longitude,
        },
      });
      cities.set(p.city, city.id);
    }
    const dKey = `${p.city}:${p.district}`;
    if (!districts.has(dKey)) {
      const district = await prisma.district.upsert({
        where: {
          cityId_slug: {
            cityId: cities.get(p.city)!,
            slug: slugify(p.district),
          },
        },
        update: {},
        create: {
          name: p.district,
          slug: slugify(p.district),
          cityId: cities.get(p.city)!,
        },
      });
      districts.set(dKey, district.id);
    }
  }

  // Properties
  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        listingType: p.listingType as ListingType,
        type: TYPE_MAP[p.type],
        status: PropertyStatus.PUBLISHED,
        price: p.price,
        currency: p.currency,
        surface: p.surface,
        landSize: p.landSize,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        floors: p.floors,
        yearBuilt: p.yearBuilt,
        energyRating: p.energyRating as EnergyRating | undefined,
        postalCode: p.postalCode,
        latitude: p.latitude,
        longitude: p.longitude,
        featured: p.featured,
        confidential: p.confidential,
        views: p.views,
        publishedAt: new Date(),
        cityId: cities.get(p.city)!,
        districtId: districts.get(`${p.city}:${p.district}`),
        agentId: agents.get(p.agent.name),
        images: {
          create: p.images.map((url, i) => ({
            url,
            position: i,
            isCover: i === 0,
            alt: p.title,
          })),
        },
        amenities: {
          create: p.amenities.map((slug) => ({
            amenity: { connect: { slug } },
          })),
        },
      },
    });
  }

  console.log(
    `✅ Seed done: ${properties.length} properties, ${cities.size} cities, ${agents.size} agents.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
