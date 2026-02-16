# ToolPulse

Production-ready Next.js (App Router) website focused on **Personal Finance & Salary** with SEO-first architecture, calculator pages, and long-form pillar guides.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- MDX guides in-repo
- Server Components by default, client JS only for calculator and search UI
- Vercel-ready

## Routes

- `/` Home (niche intro, featured tools/guides, search)
- `/tools` paginated tool index
- `/tools/[slug]` calculator pages
- `/guides` paginated guides index
- `/guides/[slug]` MDX guide pages
- `/about`, `/contact`, `/privacy`, `/terms`
- `/sitemap.xml` via `src/app/sitemap.ts`
- `/search-index.json` lightweight JSON search index
- `public/robots.txt`

## Local Run

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run validate:tools
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the GitHub repository.
3. Configure environment variables in Vercel Project Settings (`Settings > Environment Variables`):
   - `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-4604662808401939`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TOP` (optional manual slot id)
   - `NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM` (optional manual slot id)
4. Verify `siteConfig.url` in `src/lib/site.ts` matches your production domain exactly (for canonical URLs and sitemap).
5. Deploy (Vercel will run `npm run build`).

## AdSense Notes

- Auto Ads script loads globally only when `NEXT_PUBLIC_ADSENSE_CLIENT` is set.
- Manual slots on tool pages are shown only when the slot env vars are present.
- Ads may not render immediately on production until AdSense account/site approval is complete.
- Update `public/ads.txt` with your real publisher line after approval.

## SEO Checklist

- [x] Canonical URL on all pages via Metadata API
- [x] Per-page title/description/OG/Twitter metadata
- [x] Crawlable internal links and descriptive URLs
- [x] `robots.txt` + XML sitemap
- [x] Structured data:
  - Tool pages: `WebApplication`
  - Tool FAQ: `FAQPage`
  - Guide pages: `Article`
  - Breadcrumb schema on tool/guide pages
- [x] Pagination on tools and guides indexes
- [x] Lightweight client-side search over JSON index
- [x] Tool pages include formulas, assumptions, examples, edge cases, mini guide, FAQ, references, related links
- [x] Guides interlink with tools and tools link back to related guides

## Add a Tool (uniqueness + usefulness)

1. Add an entry in `catalog` inside `src/lib/tools.ts` with:
   - unique `slug`
   - distinct intent/use-case
   - proper `mode` and category
   - meaningful summary (not keyword stuffing)
2. If needed, add or adjust mode inputs in `inputsByMode` (`src/lib/tools.ts`).
3. If mode formula does not exist, add it in `src/lib/calculators.ts`.
4. Ensure content quality:
   - clear assumptions (`howWeCalculate`)
   - non-generic explanation + examples
   - realistic edge cases
   - actionable mini guide
5. Run `npm run validate:tools` and fix any field/count issues.

## Add a Guide (MDX)

1. Add guide metadata object to `src/lib/guides.ts`.
2. Add import switch case in `loadGuideComponent` (`src/lib/guides.ts`).
3. Create file in `src/content/guides/<slug>.mdx`.
4. Include internal links to relevant tool pages.
5. Keep content people-first, practical, and non-duplicative.

## Content and Compliance Notes

- Informational only; not financial/tax/legal advice.
- Major calculator updates tracked in `CHANGELOG.md`.
- Author/editor details included on guides and about page.
- Avoid thin pages and doorway-style duplication.
