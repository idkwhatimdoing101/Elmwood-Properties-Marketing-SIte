import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/neighborhood/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export type NeighborhoodSpot = "dinkytown" | "getting-around" | "park" | "daily-life";

const keywords: Record<NeighborhoodSpot, string[]> = {
  dinkytown: ["dinkytown"],
  "getting-around": ["bike", "transit", "bus", "getting-around"],
  park: ["park", "van-cleve", "vancleve"],
  "daily-life": ["store", "shop", "daily-life", "corner"],
};

export const neighborhoodPhotos: Partial<Record<NeighborhoodSpot, ImageMetadata>> = {};

for (const path in images) {
  const filename = path.split("/").pop()?.toLowerCase() ?? "";
  const spot = (Object.keys(keywords) as NeighborhoodSpot[]).find((key) =>
    keywords[key].some((word) => filename.includes(word)),
  );
  if (spot && !neighborhoodPhotos[spot]) {
    neighborhoodPhotos[spot] = images[path].default;
  }
}
