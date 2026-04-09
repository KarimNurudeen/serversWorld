# Servers World Network — Official Website

Full CMS-driven website built with **Next.js 14** + **Sanity.io**.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| CMS | Sanity.io v3 (Embedded Studio) |
| Payment | Paystack, Whop |
| Fonts | Noto Sans JP, Space Grotesk |

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Stats, Services, Portfolio, Products, Blog, Newsletter |
| `/services` | All service categories with detail pages |
| `/services/[slug]` | Individual service detail |
| `/products` | Products with search, filter, upcoming tab |
| `/products/[slug]` | Product detail with Paystack/Whop payment |
| `/portfolio` | Project gallery with category filter |
| `/portfolio/[slug]` | Project detail with gallery |
| `/blog` | Blog listing with search, filter, sidebar |
| `/blog/[slug]` | Blog post with comments, likes/dislikes |
| `/about` | Company info, team, values, testimonials |
| `/contact` | Contact form with service inquiry |
| `/studio` | Sanity CMS Studio (admin) |

## CMS Content Types

- **Site Settings** — Company name, tagline, hero video, stats, social links
- **Services** — 9 categories: Development, AI & Data, Business Systems, Digital Growth, Cloud, Security, Communication, Support, Training
- **Products** — Software tools, AI tools, templates, courses with Paystack/Whop payments
- **Portfolio Projects** — Case studies with gallery, results, tech tags
- **Blog Posts** — Articles with categories, tags, read time, author
- **Team Members** — Staff profiles with social links
- **Testimonials** — Client reviews with ratings

## Getting Started

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Create a Sanity project
Go to [sanity.io](https://sanity.io), create a free project, and get your **Project ID**.

### 3. Configure environment
Edit `.env.local`:
\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
\`\`\`

### 4. Run development server
\`\`\`bash
npm run dev
\`\`\`

### 5. Access CMS Studio
Visit `http://localhost:3000/studio` to manage all content.

## Design System

- **Background:** `#1A2744` (Dark Navy)
- **Surface:** `#233152` (Lighter Navy)
- **Primary Text:** `#FFFFFF`
- **Secondary Text:** `#B0B8C4`
- **Divider:** `rgba(255,255,255,0.15)`
- **Error:** `#FF4B4B`

## Payment Integration

### Paystack
Add `paystackKey` in the product's payment settings in the CMS.

### Whop
Add `whopUrl` in the product's payment settings in the CMS.
