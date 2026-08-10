import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/buildings/*/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export type PhotoCategory = "exterior" | "interior" | "amenity" | "floorplan";

export interface BuildingPhoto {
  src: ImageMetadata;
  category: PhotoCategory;
  label: string;
  filename: string;
}

const categorize = (filename: string): PhotoCategory => {
  const f = filename.toLowerCase();
  if (f.includes("floorplan") || f.includes("floor-plan")) return "floorplan";
  if (f.includes("exterior")) return "exterior";
  if (f.includes("parking") || f.includes("entryway") || f.includes("hallway") || f.includes("washerdryer")) {
    return "amenity";
  }
  return "interior";
};

const labelize = (filename: string) => {
  const base = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  const words = base
    .replace(/([a-z])([0-9])/gi, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export const buildingPhotos: Record<string, BuildingPhoto[]> = {};

for (const path in images) {
  const match = path.match(/buildings\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, slug, filename] = match;
  const photo: BuildingPhoto = {
    src: images[path].default,
    category: categorize(filename),
    label: labelize(filename),
    filename,
  };
  (buildingPhotos[slug] ??= []).push(photo);
}

/** Look up one specific photo by its building slug + exact filename (e.g. "kitchenliving.jpg"). */
export const getBuildingPhoto = (slug: string, filename: string) =>
  buildingPhotos[slug]?.find((p) => p.filename === filename);
