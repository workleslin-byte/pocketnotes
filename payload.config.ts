import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./payload/collections/Users";
import { Subscribers } from "./payload/collections/Subscribers";
import { Products } from "./payload/collections/Products";
import { Essays } from "./payload/collections/Essays";
import { Comments } from "./payload/collections/Comments";
import { Likes } from "./payload/collections/Likes";
import { Media } from "./payload/collections/Media";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Pocket Notes Admin",
    },
  },
  collections: [Users, Subscribers, Products, Essays, Comments, Likes, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: process.env.RESEND_FROM_EMAIL || "hello@pocketnotes.in",
        defaultFromName: process.env.RESEND_FROM_NAME || "Pocket Notes",
        apiKey: process.env.RESEND_API_KEY,
      })
    : undefined,
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  cors: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"].filter(Boolean),
});
