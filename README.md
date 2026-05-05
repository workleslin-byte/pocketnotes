# Pocket Notes

> Small books. Big ideas.

Production site: [pocketnotes.in](https://www.pocketnotes.in)

## Stack

- **Next.js 16** (App Router) on Vercel
- **Payload CMS v3** — self-hosted admin in same Next.js app
- **Neon Postgres** (free tier, via Vercel Marketplace)
- **Resend** — transactional + broadcast email
- **Tailwind CSS v4**

## Branches

| Branch | Purpose | Deploys to |
|---|---|---|
| `main` | Current live static site | **production** (`pocketnotes.in`) |
| `legacy-static` | Read-only snapshot of the original static site | — |
| `rebuild` | Next.js + Payload rebuild in progress | preview URL only |

The `rebuild` branch is merged to `main` only when the new app is feature-complete and approved. Production is **never** at risk during the rebuild.

## Local development

```bash
# 1. Install
npm install

# 2. Configure env (copy and fill in)
cp .env.example .env.local

# 3. Required env vars:
#    DATABASE_URL              postgresql://... (Neon)
#    PAYLOAD_SECRET            64-char random string
#    RESEND_API_KEY            from resend.com dashboard
#    RESEND_FROM_EMAIL         hello@pocketnotes.in (must be verified in Resend)

# 4. Run dev server
npm run dev
# → http://localhost:3000              site
# → http://localhost:3000/admin        Payload admin (create first user on first visit)
```

## Repository layout

```
app/
  (payload)/      # Payload admin + REST/GraphQL — DO NOT rename
  page.tsx        # Site homepage
  layout.tsx      # Root layout
payload/
  collections/    # Content models: Essays, Products, Subscribers, Comments, Likes, Media, Users
payload.config.ts # Payload root config
legacy/           # Snapshot of the original static site (reference only)
```

## Deploy

Vercel auto-deploys every branch:
- `main` → production (`pocketnotes.in`)
- any other branch → preview URL

To promote `rebuild` to production: merge `rebuild` → `main`.

## License

Proprietary — © Pocket Notes / Leslin K Seemon. All rights reserved.
