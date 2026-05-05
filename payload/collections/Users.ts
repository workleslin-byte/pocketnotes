import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    description: "Site administrators (Leslin et al). For newsletter subscribers, see the Subscribers collection.",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.collection === "users",
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
