export type MapPointType = "building" | "umn" | "bus";

export interface MapPoint {
  label: string;
  lat: number;
  lng: number;
  type: MapPointType;
  href?: string;
}

// Building coordinates for 1040/1100 Como Ave SE and 1410/1720 Rollins Ave SE are
// estimated from Minneapolis's address grid (exact street-address geocoding wasn't
// available for these two streets) — nudge if they land off.
export const mapPoints: MapPoint[] = [
  { label: "1040 Como Ave SE", lat: 44.987318, lng: -93.236219, type: "building", href: "/buildings/1040-como-ave-se" },
  { label: "1100 Como Ave SE", lat: 44.987346, lng: -93.235469, type: "building", href: "/buildings/1100-como-ave-se" },
  { label: "1410 Rollins Ave SE", lat: 44.985441, lng: -93.231591, type: "building", href: "/buildings/1410-rollins-ave-se" },
  { label: "1720 Rollins Ave SE", lat: 44.985582, lng: -93.227716, type: "building", href: "/buildings/1720-rollins-ave-se" },
  { label: "817 12th Ave SE", lat: 44.985743, lng: -93.235352, type: "building", href: "/buildings/817-12th-ave-se" },
  { label: "823 15th Ave SE", lat: 44.984845, lng: -93.230869, type: "building", href: "/buildings/823-15th-ave-se" },
  { label: "837 15th Ave SE", lat: 44.985218, lng: -93.230651, type: "building", href: "/buildings/837-15th-ave-se" },
  { label: "University of Minnesota", lat: 44.974843, lng: -93.235355, type: "umn" },
  { label: "Bus stop — Rollins Ave SE & 15th Ave SE", lat: 44.985482, lng: -93.230466, type: "bus" },
  { label: "Bus stop — Como Ave SE & 15th Ave SE", lat: 44.987528, lng: -93.230469, type: "bus" },
];
