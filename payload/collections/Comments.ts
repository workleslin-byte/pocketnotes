import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  admin: {
    useAsTitle: "preview",
    defaultColumns: ["preview", "essay", "subscriber", "status", "createdAt"],
    description: "Comments require a verified subscriber. All comments default to 'pending' for moderation.",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === "users") return true;
      return { status: { equals: "approved" } };
    },
    create: ({ req: { user } }) => user?.collection === "subscribers",
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    { name: "essay", type: "relationship", relationTo: "essays", required: true, index: true },
    { name: "subscriber", type: "relationship", relationTo: "subscribers", required: true },
    { name: "body", type: "textarea", required: true, maxLength: 2000 },
    {
      name: "preview",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [({ data, value }) => (data?.body ? data.body.slice(0, 80) : value)],
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      required: true,
      options: [
        { label: "Pending review", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Spam", value: "spam" },
      ],
    },
    { name: "moderatedAt", type: "date" },
    { name: "moderatedBy", type: "relationship", relationTo: "users" },
    { name: "ipHash", type: "text", admin: { readOnly: true, description: "Hashed IP for spam tracking." } },
  ],
};
