import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "series", "price", "isAvailable"],
    description: "Pocket Notes product catalog. Currently: 500 Series, Flow Series.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.collection === "users",
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { description: "URL slug, e.g. '500-series'" } },
    {
      name: "series",
      type: "select",
      required: true,
      options: [
        { label: "500 Series", value: "500" },
        { label: "Flow Series", value: "flow" },
      ],
    },
    { name: "tagline", type: "text", admin: { description: "Short subhead under product name." } },
    { name: "description", type: "richText" },
    {
      name: "specs",
      type: "group",
      fields: [
        { name: "pageCount", type: "number" },
        { name: "paperType", type: "text", admin: { description: "e.g. 'Plain', 'Dotted', 'Ruled'" } },
        { name: "gsm", type: "number", admin: { description: "Paper weight in GSM" } },
        { name: "binding", type: "text", admin: { description: "e.g. 'Saddle stitch', 'Perfect bound'" } },
        { name: "dimensions", type: "text", admin: { description: "e.g. 'A6 (105 × 148 mm)'" } },
        { name: "coverColor", type: "text" },
        { name: "weight", type: "text", admin: { description: "e.g. '60g'" } },
      ],
    },
    {
      name: "price",
      type: "group",
      fields: [
        { name: "amount", type: "number", required: true, admin: { description: "Price in INR (rupees)" } },
        { name: "currency", type: "select", defaultValue: "INR", options: [{ label: "INR", value: "INR" }] },
        { name: "compareAtAmount", type: "number", admin: { description: "Optional: original price for strike-through" } },
      ],
    },
    { name: "sku", type: "text", admin: { description: "Stock keeping unit" } },
    {
      name: "images",
      type: "array",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "isPrimary", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "features",
      type: "array",
      fields: [{ name: "feature", type: "text", required: true }],
      admin: { description: "Bullet features displayed on product page." },
    },
    { name: "isAvailable", type: "checkbox", defaultValue: true, admin: { description: "Show on shop page" } },
    { name: "inStock", type: "checkbox", defaultValue: true },
    { name: "stockCount", type: "number" },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text", maxLength: 60 },
        { name: "metaDescription", type: "textarea", maxLength: 155 },
      ],
    },
  ],
};
