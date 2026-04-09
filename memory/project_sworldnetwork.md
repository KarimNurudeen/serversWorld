---
name: SworldNetwork Project
description: Full CMS website for Servers World Network — Next.js 14 + Sanity.io
type: project
---

Website built for Servers World Network at /Users/karimnurudeen/Downloads/SworldNetwork.

**Why:** User is a senior software developer at Servers World Network tasked with building the official website. Strict requirement: fully CMS-driven approach.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Sanity.io v3 (embedded studio at /studio), lucide-react v1.x (note: social icons removed — custom SocialIcons.tsx component used instead).

**How to apply:** When working on this project, remember Sanity studio is embedded at /studio route. Social media icons are in components/ui/SocialIcons.tsx (not from lucide-react). All data fetching uses `safeFetch` from sanity/lib/client.ts which gracefully handles unconfigured Sanity (no project ID set yet).

**Key decisions:**
- Used `safeFetch` wrapper so site builds and runs even without a real Sanity project ID configured
- Tailwind CSS v3 (v4 breaks PostCSS integration with Next.js 14)
- Sanity v3 (v5 requires React 19 / React Compiler, incompatible with React 18 + Next.js 14)
- Payment: Paystack (inline JS) + Whop product links

**Env vars needed:** NEXT_PUBLIC_SANITY_PROJECT_ID (must be a-z, 0-9, dashes only)
