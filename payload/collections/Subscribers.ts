import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  auth: {
    tokenExpiration: 60 * 60 * 24 * 30,
    cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" },
    useAPIKey: false,
    verify: true,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "status", "subscribedAt"],
    description: "Newsletter subscribers. Must verify email to comment on essays.",
  },
  access: {
    read: ({ req: { user } }) => user?.collection === "users",
    create: () => true,
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      required: true,
      options: [
        { label: "Pending verification", value: "pending" },
        { label: "Verified (active)", value: "verified" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
    },
    {
      name: "source",
      type: "select",
      defaultValue: "essay-footer",
      options: [
        { label: "Essay footer form", value: "essay-footer" },
        { label: "Homepage", value: "homepage" },
        { label: "Blog page", value: "blog" },
        { label: "Manual import", value: "manual" },
      ],
    },
    { name: "subscribedAt", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "verifiedAt", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "unsubscribedAt", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
    {
      name: "resendContactId",
      type: "text",
      admin: { description: "Resend audience contact ID for broadcast lists.", readOnly: true },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && !data.subscribedAt) {
          data.subscribedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
