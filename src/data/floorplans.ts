export type UnitType = "studio" | "oneBed" | "twoBed" | "threeBed" | "fourBed" | "fiveBed";

export interface Building {
  address: string;
  slug: string;
}

// All Elmwood buildings share the same pricing structure.
export const buildings: Building[] = [
  { address: "1040 Como Ave SE", slug: "1040-como-ave-se" },
  { address: "1100 Como Ave SE", slug: "1100-como-ave-se" },
  { address: "1410 Rollins Ave SE", slug: "1410-rollins-ave-se" },
  { address: "1720 Rollins Ave SE", slug: "1720-rollins-ave-se" },
  { address: "817 12th Ave SE", slug: "817-12th-ave-se" },
  { address: "823 15th Ave SE", slug: "823-15th-ave-se" },
  { address: "837 15th Ave SE", slug: "837-15th-ave-se" },
];

export const unitTypes: { key: UnitType; name: string; beds: number; price: number }[] = [
  { key: "studio", name: "Studio", beds: 0, price: 1150 },
  { key: "oneBed", name: "1 Bedroom", beds: 1, price: 1200 },
  { key: "twoBed", name: "2 Bedroom", beds: 2, price: 1500 },
  { key: "threeBed", name: "3 Bedroom", beds: 3, price: 2100 },
  { key: "fourBed", name: "4 Bedroom", beds: 4, price: 2800 },
  { key: "fiveBed", name: "5 Bedroom", beds: 5, price: 3200 },
];

export const startingPrice = (key: UnitType) => unitTypes.find((type) => type.key === key)?.price ?? null;

export const bedLabel = (beds: number) => (beds === 0 ? "Studio layout" : `${beds} bed`);
export const fmt = (price: number | null) => (price === null ? "—" : `$${price.toLocaleString()}`);
