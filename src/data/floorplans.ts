export type UnitType = "studio" | "oneBed" | "twoBed" | "threeBed" | "fourBed" | "fiveBed";

export interface Building {
  address: string;
  studio: number | null;
  oneBed: number | null;
  twoBed: number | null;
  threeBed: number | null;
  fourBed: number | null;
  fiveBed: number | null;
}

// Pricing as of July 2026 — update here as availability changes.
export const buildings: Building[] = [
  { address: "1040 Como Ave SE", studio: 1250, oneBed: 1475, twoBed: null, threeBed: null, fourBed: null, fiveBed: null },
  { address: "1100 Como Ave SE", studio: null, oneBed: 1300, twoBed: null, threeBed: null, fourBed: null, fiveBed: null },
  { address: "1410 Rollins Ave SE", studio: null, oneBed: null, twoBed: 1750, threeBed: 2400, fourBed: null, fiveBed: null },
  { address: "1720 Rollins Ave SE", studio: null, oneBed: null, twoBed: null, threeBed: null, fourBed: 3000, fiveBed: null },
  { address: "817 12th Ave SE", studio: 1150, oneBed: 1300, twoBed: 1650, threeBed: null, fourBed: null, fiveBed: null },
  { address: "823 15th Ave SE", studio: 1250, oneBed: 1575, twoBed: null, threeBed: 2300, fourBed: null, fiveBed: null },
  { address: "829 15th Ave SE", studio: null, oneBed: null, twoBed: null, threeBed: null, fourBed: null, fiveBed: 3200 },
  { address: "837 15th Ave SE", studio: null, oneBed: null, twoBed: null, threeBed: 2400, fourBed: null, fiveBed: null },
  { address: "918 17th Ave SE", studio: null, oneBed: null, twoBed: null, threeBed: null, fourBed: 2800, fiveBed: null },
  { address: "924 17th Ave SE", studio: null, oneBed: null, twoBed: 1750, threeBed: null, fourBed: 3000, fiveBed: null },
];

export const unitTypes: { key: UnitType; name: string; beds: number }[] = [
  { key: "studio", name: "Studio", beds: 0 },
  { key: "oneBed", name: "1 Bedroom", beds: 1 },
  { key: "twoBed", name: "2 Bedroom", beds: 2 },
  { key: "threeBed", name: "3 Bedroom", beds: 3 },
  { key: "fourBed", name: "4 Bedroom", beds: 4 },
  { key: "fiveBed", name: "5 Bedroom", beds: 5 },
];

export const startingPrice = (key: UnitType) => {
  const prices = buildings.map((b) => b[key]).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
};

export const bedLabel = (beds: number) => (beds === 0 ? "Studio layout" : `${beds} bed`);
export const fmt = (price: number | null) => (price === null ? "—" : `$${price.toLocaleString()}`);
