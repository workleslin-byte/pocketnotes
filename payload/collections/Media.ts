import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { description: "Uploaded images and SVGs. Use SVG for thumbnails per brand spec." },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.collection === "users",
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  upload: {
    staticDir: "public/uploads",
    mimeTypes: ["image/*", "image/svg+xml"],
    imageSizes: [
      { name: "thumb", width: 480, height: undefined, position: "centre" },
      { name: "card", width: 768, height: undefined, position: "centre" },
      { name: "feature", width: 1600, height: undefined, position: "centre" },
    ],
  },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "text" },
  ],
};
