export interface BuildingContent {
  slug: string;
  address: string;
  name: string;
  heroDescription: string;
  overview: string;
  highlights: string[];
}

export const buildingContent: BuildingContent[] = [
  {
    slug: "1040-como-ave-se",
    address: "1040 Como Ave SE",
    name: "1040 Como Ave SE Apartments",
    heroDescription:
      "Apartments at 1040 Como Ave SE in the SE Como neighborhood of Minneapolis, MN, a 15-minute walk to the University of Minnesota East Bank campus.",
    overview:
      "Studio and large one-bedroom apartments with high 9 ft ceilings, the one-beds sized to comfortably fit two people. Stainless steel appliances, granite countertops, and ceramic floors throughout, with super-insulated walls for sound privacy and consistent temperature control. Forced air heating and air conditioning with individual apartment fresh air exchange keep the air clean and comfortable year-round. Close to major shopping centers and convenience stores, with MTC bus routes nearby — the #3 stops at the corner of Como Ave SE and 15th Ave SE, and the #4 and #118 stop around the corner at 10th Ave SE and 8th St SE.",
    highlights: [
      "Water, internet, and trash collection included; parking included for most apartments",
      "Stainless steel appliances, granite countertops, and ceramic floors",
      "Forced air heating and air conditioning with fresh air exchange",
      "Inside bicycle garage with phone-viewable security camera",
      "Elevator building with fantastic window views",
      "24/7 maintenance and security cameras",
      "Dogs and cats permitted, plus an on-site pet washroom",
    ],
  },
  {
    slug: "1100-como-ave-se",
    address: "1100 Como Ave SE",
    name: "1100 Como Ave SE Apartments",
    heroDescription:
      "Apartments at 1100 Como Ave SE in Minneapolis' historic SE Como neighborhood, minutes from the University of Minnesota.",
    overview:
      "1100 Como Ave SE sits in the heart of SE Como, one of Minneapolis' historic neighborhoods close to the U of M campus.",
    highlights: [
      "Heat, water, internet, garbage collection, and parking included",
      "24/7 maintenance and security cameras",
      "Cats welcome",
    ],
  },
  {
    slug: "1410-rollins-ave-se",
    address: "1410 Rollins Ave SE",
    name: "1410 Rollins Ave SE Apartments",
    heroDescription:
      "Apartments at 1410 Rollins Ave SE in Minneapolis' historic SE Como neighborhood, minutes from the University of Minnesota.",
    overview:
      "1410 Rollins Ave SE sits in SE Como, close to the U of M campus, with in-unit laundry included.",
    highlights: [
      "Water, internet, garbage collection, and parking included",
      "In-unit washer-dryer",
      "24/7 maintenance and security cameras",
      "Dogs and cats welcome",
    ],
  },
  {
    slug: "1720-rollins-ave-se",
    address: "1720 Rollins Ave SE",
    name: "1720 Rollins Ave SE",
    heroDescription:
      "A 4-bedroom house at 1720 Rollins Ave SE in Minneapolis' historic SE Como neighborhood, minutes from the University of Minnesota.",
    overview:
      "A 4-bedroom home near the U of M with a big yard and hardwood floors — lawn care and snow removal are handled for you.",
    highlights: [
      "Big yard, with lawn care and snow removal included",
      "Hardwood floors throughout",
      "Parking, washer-dryer, and appliances included",
      "Garbage collection and 24/7 maintenance",
      "Cats and dogs welcome",
    ],
  },
  {
    slug: "817-12th-ave-se",
    address: "817 12th Ave SE",
    name: "817 12th Ave SE Apartments",
    heroDescription:
      "Apartments at 817 12th Ave SE in Minneapolis' historic Marcy-Holmes neighborhood, near the University of Minnesota.",
    overview:
      "817 12th Ave SE sits in Marcy-Holmes, one of Minneapolis' historic neighborhoods close to campus.",
    highlights: [
      "Heat, water, internet, garbage collection, and parking included",
      "24/7 maintenance and security cameras",
    ],
  },
  {
    slug: "823-15th-ave-se",
    address: "823 15th Ave SE",
    name: "823 15th Ave SE Apartments",
    heroDescription:
      "Apartments at 823 15th Ave SE in the SE Como neighborhood of Minneapolis, MN, near the University of Minnesota.",
    overview:
      "One-bedroom apartments here are sized to comfortably accommodate two people, with super-insulated walls that keep things quiet and private.",
    highlights: [
      "Stainless appliances and in-unit laundry",
      "Central heat and air conditioning",
      "Ceramic floors",
      "Internet, garbage collection, and parking included",
      "24/7 maintenance and security cameras",
      "Dogs and cats welcome",
    ],
  },
  {
    slug: "837-15th-ave-se",
    address: "837 15th Ave SE",
    name: "837 15th Ave SE Apartments",
    heroDescription:
      "Apartments at 837 15th Ave SE in the SE Como neighborhood of Minneapolis, MN, near the University of Minnesota.",
    overview:
      "837 15th Ave SE sits in SE Como, close to the U of M campus, with in-unit laundry included.",
    highlights: [
      "Water, internet, garbage collection, and parking included",
      "In-unit washer-dryer",
      "24/7 maintenance and security cameras",
      "Cats OK",
    ],
  },
];

export const getBuildingBySlug = (slug: string) => buildingContent.find((b) => b.slug === slug);
