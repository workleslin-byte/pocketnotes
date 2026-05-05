import type { CollectionConfig } from "payload";

export const Likes: CollectionConfig = {
  slug: "likes",
  admin: {
    useAsTitle: "fingerprint",
    defaultColumns: ["essay", "fingerprint", "createdAt"],
    description: "Anonymous like records. One per (essay, fingerprint) pair.",
  },
  access: {
    read: ({ req: { user } }) => user?.collection === "users",
    create: () => true,
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    { name: "essay", type: "relationship", relationTo: "essays", required: true, index: true },
    {
      name: "fingerprint",
      type: "text",
      required: true,
      index: true,
      admin: { description: "Cookie ID + IP hash. Dedup key for anonymous likes." },
    },
    { name: "subscriber", type: "relationship", relationTo: "subscribers", admin: { description: "Set if liker is logged in." } },
  ],
  indexes: [{ fields: ["essay", "fingerprint"], unique: true }],
};
