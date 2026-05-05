import type { CollectionConfig } from "payload";

export const Essays: CollectionConfig = {
  slug: "essays",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
    description: "All long-form writing — principle essays (linked from About) and blog essays (linked from /blog). Same template, filtered by category.",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === "users") return true;
      return { status: { equals: "published" } };
    },
    create: ({ req: { user } }) => user?.collection === "users",
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea", admin: { description: "1–2 sentence preview shown on listing pages." } },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "blog-essay",
      options: [
        { label: "Principle essay (about page)", value: "principle" },
        { label: "Blog essay (/blog)", value: "blog-essay" },
        { label: "Featured longform", value: "longform" },
      ],
    },
    {
      name: "tag",
      type: "select",
      options: [
        { label: "History", value: "history" },
        { label: "Philosophy", value: "philosophy" },
        { label: "Method", value: "method" },
        { label: "Technique", value: "technique" },
        { label: "Ritual", value: "ritual" },
        { label: "Founder", value: "founder" },
      ],
    },
    { name: "readTimeMinutes", type: "number", admin: { description: "Auto-calculated on save if blank." } },
    {
      name: "principleNumber",
      type: "number",
      admin: { description: "Only for principle essays (1–8). Order on About page.", condition: (data) => data.category === "principle" },
    },
    { name: "content", type: "richText" },
    { name: "featuredImage", type: "upload", relationTo: "media" },
    { name: "thumbnail", type: "upload", relationTo: "media", admin: { description: "SVG or small image for listing cards." } },
    { name: "author", type: "text", defaultValue: "Leslin K Seemon" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    { name: "publishedAt", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
    {
      name: "relatedEssays",
      type: "relationship",
      relationTo: "essays",
      hasMany: true,
      maxRows: 3,
      admin: { description: "Manually curate 'Read Next' picks (3 max)." },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text", maxLength: 60 },
        { name: "metaDescription", type: "textarea", maxLength: 155 },
      ],
    },
    {
      name: "stats",
      type: "group",
      admin: { readOnly: true, description: "Computed cache fields." },
      fields: [
        { name: "likeCount", type: "number", defaultValue: 0 },
        { name: "commentCount", type: "number", defaultValue: 0 },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
