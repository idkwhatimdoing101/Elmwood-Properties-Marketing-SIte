export type UnitType = "studio" | "oneBed" | "twoBed" | "threeBed" | "fourBed";

export interface Building {
  address: string;
  slug: string;
}

export const buildings: Building[] = [
  { address: "1040 Como Ave SE", slug: "1040-como-ave-se" },
  { address: "1100 Como Ave SE", slug: "1100-como-ave-se" },
  { address: "1410 Rollins Ave SE", slug: "1410-rollins-ave-se" },
  { address: "1720 Rollins Ave SE", slug: "1720-rollins-ave-se" },
  { address: "817 12th Ave SE", slug: "817-12th-ave-se" },
  { address: "823 15th Ave SE", slug: "823-15th-ave-se" },
  { address: "837 15th Ave SE", slug: "837-15th-ave-se" },
];

export interface UnitTypeMeta {
  key: UnitType;
  name: string;
  beds: number;
  /** URL slug used for the /floor-plans/[slug] results page. */
  slug: string;
  /** Representative photo shown on carousel/card previews for this unit type. */
  photo: { buildingSlug: string; filename: string };
}

export const unitTypeMeta: UnitTypeMeta[] = [
  {
    key: "studio",
    name: "Studio",
    beds: 0,
    slug: "studio",
    photo: { buildingSlug: "1040-como-ave-se", filename: "como-kitchenliving.jpg" },
  },
  {
    key: "oneBed",
    name: "1 Bedroom",
    beds: 1,
    slug: "1-bedroom",
    photo: { buildingSlug: "817-12th-ave-se", filename: "kitchenliving.jpg" },
  },
  {
    key: "twoBed",
    name: "2 Bedroom",
    beds: 2,
    slug: "2-bedroom",
    photo: { buildingSlug: "823-15th-ave-se", filename: "kitchenliving.jpg" },
  },
  {
    key: "threeBed",
    name: "3 Bedroom",
    beds: 3,
    slug: "3-bedroom",
    photo: { buildingSlug: "1410-rollins-ave-se", filename: "kitchenliving.jpg" },
  },
  {
    key: "fourBed",
    name: "4 Bedroom",
    beds: 4,
    slug: "4-bedroom",
    photo: { buildingSlug: "1720-rollins-ave-se", filename: "exterior.jpg" },
  },
];

export interface Offering {
  buildingSlug: string;
  unitType: UnitType;
  /** null = no price to publish right now (e.g. a unit currently being sold). */
  price: number | null;
  note?: string;
}

// Real per-building inventory. Multiple buildings can (and do) offer the
// same unit type at different prices — this is a many-to-many mapping,
// not one building per type.
export const offerings: Offering[] = [
  { buildingSlug: "1040-como-ave-se", unitType: "studio", price: 1250 },
  { buildingSlug: "1040-como-ave-se", unitType: "oneBed", price: 1250 },
  { buildingSlug: "1100-como-ave-se", unitType: "oneBed", price: 1250 },
  { buildingSlug: "1410-rollins-ave-se", unitType: "twoBed", price: 1750 },
  { buildingSlug: "1410-rollins-ave-se", unitType: "threeBed", price: 2100 },
  {
    buildingSlug: "1720-rollins-ave-se",
    unitType: "fourBed",
    price: null,
    note: "This home is currently being sold — contact us for availability.",
  },
  { buildingSlug: "817-12th-ave-se", unitType: "studio", price: 1150 },
  { buildingSlug: "817-12th-ave-se", unitType: "oneBed", price: 1200 },
  { buildingSlug: "817-12th-ave-se", unitType: "twoBed", price: 1500 },
  { buildingSlug: "823-15th-ave-se", unitType: "studio", price: 1250 },
  { buildingSlug: "823-15th-ave-se", unitType: "oneBed", price: 1200 },
  { buildingSlug: "823-15th-ave-se", unitType: "twoBed", price: 2100 },
  { buildingSlug: "837-15th-ave-se", unitType: "threeBed", price: 2100, note: "Penthouse unit." },
];

export const getUnitTypeMeta = (key: UnitType) => unitTypeMeta.find((t) => t.key === key);
export const getUnitTypeBySlug = (slug: string) => unitTypeMeta.find((t) => t.slug === slug);

export const offeringsForType = (key: UnitType) => offerings.filter((o) => o.unitType === key);
export const offeringsForBuilding = (slug: string) => offerings.filter((o) => o.buildingSlug === slug);

/** Lowest published price for a unit type across every building that offers it. */
export const startingPrice = (key: UnitType) => {
  const prices = offeringsForType(key)
    .map((o) => o.price)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
};

export const bedLabel = (beds: number) => (beds === 0 ? "Studio layout" : `${beds} bed`);
export const fmt = (price: number | null) => (price === null ? "—" : `$${price.toLocaleString()}`);
