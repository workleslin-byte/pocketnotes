/**
 * One-time seed script. Populates the DB with the two product variants and
 * the canonical voice-bible essay. Run with: `npx tsx scripts/seed.ts`.
 * Idempotent — safe to re-run; skips records that already exist by slug.
 */
import { getPayload } from "payload";
import config from "../payload.config";

const products = [
  {
    title: "500 Series — Founder Edition",
    slug: "500-series",
    series: "500" as const,
    tagline: "Three books for the founder's pocket.",
    specs: {
      pageCount: 64,
      paperType: "Grid",
      gsm: 80,
      binding: "Saddle stitch (staple)",
      dimensions: "A6 (105 × 148 mm)",
      coverColor: "Black & yellow",
      weight: "60g per book",
    },
    price: { amount: 299, currency: "INR" as const },
    sku: "PN-500-BY-A6-64",
    features: [
      { feature: "Set of three A6 notebooks" },
      { feature: "64 grid pages, 80 GSM cream paper" },
      { feature: "Saddle-stitch binding lays flat in the hand" },
      { feature: "Designed to disappear into a pocket" },
      { feature: "Founder Edition cover — black and yellow" },
    ],
    isAvailable: true,
    inStock: true,
  },
  {
    title: "Flow Series",
    slug: "flow-series",
    series: "flow" as const,
    tagline: "Three books for the long, wandering thought.",
    specs: {
      pageCount: 64,
      paperType: "Grid",
      gsm: 80,
      binding: "Saddle stitch (staple)",
      dimensions: "A6 (105 × 148 mm)",
      coverColor: "Purple",
      weight: "60g per book",
    },
    price: { amount: 299, currency: "INR" as const },
    sku: "PN-FLOW-PR-A6-64",
    features: [
      { feature: "Set of three A6 notebooks" },
      { feature: "64 grid pages, 80 GSM cream paper" },
      { feature: "Saddle-stitch binding lays flat in the hand" },
      { feature: "Pocket-sized, weighs almost nothing" },
      { feature: "Soft purple cover — for the unhurried mind" },
    ],
    isAvailable: true,
    inStock: true,
  },
];

async function run() {
  const payload = await getPayload({ config });

  for (const p of products) {
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      payload.logger.info(`Skipping existing product: ${p.slug}`);
      continue;
    }
    await payload.create({ collection: "products", data: p });
    payload.logger.info(`Created product: ${p.slug}`);
  }

  payload.logger.info("Seed complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
