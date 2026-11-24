// Services listed on the Resident Portal (src/pages/residents/index.astro).
//
// Each service lives at /residents/<slug>.
// - "live": the service has its own page file at src/pages/residents/<slug>.astro.
// - "coming-soon": a placeholder page is generated automatically by
//   src/pages/residents/[slug].astro, and the portal card shows a "Coming soon" tag.
//
// To launch a service: create src/pages/residents/<slug>.astro with the real
// feature, then change its status here to "live".
export type ResidentService = {
  slug: string;
  title: string;
  description: string;
  cta: string;
  status: "live" | "coming-soon";
};

export const residentServices: ResidentService[] = [
  {
    slug: "maintenance-request",
    title: "Maintenance Request",
    description: "Something broken or not working right? Tell us what's going on and we'll get it fixed.",
    cta: "Submit a Request",
    status: "live",
  },
  {
    slug: "pay-rent",
    title: "Pay Rent",
    description: "Pay your monthly rent online.",
    cta: "Pay Rent",
    status: "coming-soon",
  },
  {
    slug: "pay-deposit",
    title: "Pay Deposit",
    description: "Pay your security deposit online.",
    cta: "Pay Deposit",
    status: "coming-soon",
  },
  {
    slug: "move-in-form",
    title: "Move-In Form",
    description: "Review and confirm your move-in details ahead of move-in day.",
    cta: "Open Form",
    status: "coming-soon",
  },
];
