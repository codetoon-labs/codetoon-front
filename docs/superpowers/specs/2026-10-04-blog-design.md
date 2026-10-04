# Blog — Design

**Date:** 2026-10-04
**Repos:** `codetoon-labs/codetoon` (Laravel CMS, "backend") and `codetoon-labs/codetoon-front` (Next.js site, "frontend")
**Status:** Approved in conversation; awaiting spec review

## Intent

Add a blog to codetoon.net whose purpose is **organic search traffic**: keyword-targeted articles in English and Arabic that rank and turn readers into leads (contact modal / WhatsApp). Success means posts are fully indexable in both languages without duplicate content, carry complete structured data, and editors can publish without a developer.

### Decisions made with the product owner

| Topic | Decision |
|---|---|
| Purpose | Organic search traffic |
| Languages | One post holds both languages; same slug in both |
| Untranslated Arabic | Hidden until translated: `/ar/blog/<slug>` redirects to the English post, Arabic listings exclude it, hreflang/sitemap omit `ar` |
| Authors | Existing Team members (with a new optional bio) |
| Organisation | Blog categories (own listing pages) + tags |
| Editor | Filament RichEditor per language + optional FAQ repeater; table of contents from H2s |
| Freshness | Blog pages revalidate every 5 minutes; no webhook |

### Assumptions (accepted)

- Posts have **draft / published** status and a `published_at` that may be in the future (scheduled).
- Each post has its own SEO title/description and a cover image with alt text.
- URLs: `/blog`, `/blog/<slug>`, `/blog/category/<slug>`, mirrored under `/ar`.

### Out of scope

Comments, newsletter signup, RSS feed, search, multiple authors per post, per-language slugs, on-demand revalidation webhooks.

---

## 1. Backend (`codetoon`)

### 1.1 Data model

All translatable attributes use `spatie/laravel-translatable` and are stored as `{ "en": …, "ar": … }`. New columns are created with `$table->json()` so migrations run on PostgreSQL (production today), MySQL (planned) and SQLite (tests).

**`blog_categories`**

| Column | Type | Notes |
|---|---|---|
| `id` | pk | |
| `name` | json (translatable) | required in `en` |
| `slug` | string, unique | English; URL key for both languages |
| `description` | json (translatable), nullable | shown on the category page |
| `seo_title`, `seo_description` | json (translatable), nullable | fall back to name / description |
| `sort_order` | int, default 0 | chip order |
| timestamps, soft deletes | | |

**`blog_posts`**

| Column | Type | Notes |
|---|---|---|
| `id` | pk | |
| `title` | json (translatable) | required in `en` |
| `slug` | string, unique | English; shared by both languages |
| `excerpt` | json (translatable), nullable | card text and meta fallback |
| `body` | json (translatable), nullable | sanitised HTML |
| `seo_title`, `seo_description` | json (translatable), nullable | fall back to title / excerpt |
| `cover_alt` | json (translatable), nullable | cover image alt text |
| `faqs` | json (translatable), nullable | per locale: `[{question, answer}]` |
| `reading_time` | json, nullable | per locale minutes, computed on save: `{en: 6, ar: 7}` |
| `status` | string, default `draft` | `draft` \| `published` |
| `published_at` | timestamp, nullable | future = scheduled |
| `blog_category_id` | fk → `blog_categories`, nullable, `nullOnDelete` | |
| `author_id` | fk → `teams`, nullable, `nullOnDelete` | |
| timestamps, soft deletes | | |

Indexes: `(status, published_at)`, `blog_category_id`.
Media: `cover` collection (single file) via spatie medialibrary.
Tags: `spatie/laravel-tags` (`HasTags`), the same as services and projects.

**`teams`**: add `bio` json (translatable), nullable.

### 1.2 Model rules (`App\Models\BlogPost`)

- `scopeLive`: `status = 'published' AND published_at IS NOT NULL AND published_at <= now()`.
- `isAvailableIn(string $locale): bool`: non-empty `title` **and** `body` translation in that locale. English is always required, so `en` is always available for live posts.
- `availableLocales(): array`: the supported locales (`config('app.supported_locales')`) passing `isAvailableIn`.
- `scopeAvailableIn($locale)`: the query-level equivalent, used by the `locale` filter. It's implemented with the query builder's JSON path (`whereNotNull('title->ar')` plus a non-empty check), so it compiles on pgsql, mysql and sqlite.
- **On `saving`:**
  - Each locale's `body` is passed through `App\Support\ArticleHtml::clean()`.
  - Each locale's `reading_time` is recomputed (words / 200, minimum 1).
  - Each locale's `faqs` rows are trimmed, and rows without a question or answer are dropped.
- `ArticleHtml::clean()` uses `symfony/html-sanitizer`, which is a **new composer dependency**:
  - **Kept:** `h2`–`h4`, `p`, `br`, `strong`, `em`, `u`, `s`, `a[href|title|target|rel]` (with `rel="noopener"` added for external links), `ul`, `ol`, `li`, `blockquote`, `code`, `pre`, `img[src|alt|width|height]`, `figure`, `figcaption`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `hr`.
  - **Dropped:** scripts, inline styles, event handlers, iframes.
  - **H2 anchors:** every `h2` gets a stable `id` slugified from its text. Duplicates get `-2` and so on. Arabic headings keep their Arabic characters in the id.

### 1.3 Filament admin

**Blog Posts resource:** uses the lara-zeus `Translatable` concern with the `LocaleSwitcher` on List, Create and Edit.
- **Content tab:**
  - `title`, plus `slug` (read-only, synced from the English title via `App\Filament\Support\SlugSync`).
  - `excerpt` (textarea, 300-character limit) and `body` (RichEditor with file attachments stored on the public media disk).
  - Cover upload (`SpatieMediaLibraryFileUpload`, webp/jpg/png) and `cover_alt`.
- **SEO tab:** `seo_title` (counter, target ≤ 60) and `seo_description` (counter, target ≤ 155).
- **FAQ tab:** a repeater of `question` (text) and `answer` (textarea).
- **Publishing tab:** `status`, `published_at` (defaults to now when status becomes published and the date is empty), `blog_category_id`, `author_id` (Team select), and tags.
- **Table:**
  - Columns: title (searchable), category, author, status badge, an "EN / AR" availability badge, `published_at` (sortable).
  - Filters: status and category.

**Blog Categories resource:** `Translatable` with the `LocaleSwitcher`, the slug synced from the English name, and fields for `description`, `seo_title`, `seo_description` and `sort_order`.

**Team resource:** adds a `bio` textarea.

### 1.4 GraphQL (Lighthouse)

Conventions from PR #19: translatable fields return `Translation { en ar }` via `@translations`; `null` = not translated.

```graphql
type BlogCategory {
  id: ID!
  slug: String!
  name: Translation @translations
  description: Translation @translations
  seo_title: Translation @translations
  seo_description: Translation @translations
  posts_count: Int!            # live posts only
}

type Faq { question: String! answer: String! }
type FaqTranslation { en: [Faq!] ar: [Faq!] }
type ReadingTime { en: Int ar: Int }

type BlogPost {
  id: ID!
  slug: String!
  title: Translation @translations
  excerpt: Translation @translations
  body: Translation @translations
  seo_title: Translation @translations
  seo_description: Translation @translations
  cover_alt: Translation @translations
  faqs: FaqTranslation
  reading_time: ReadingTime
  available_locales: [String!]!
  published_at: DateTime!
  updated_at: DateTime!
  cover: Media
  category: BlogCategory
  author: Team
  tags: [Translation!]
}

extend type Query {
  blogPosts(category: String, tag: String, locale: String): [BlogPost!]!
    @paginate(defaultCount: 12)          # live only, newest published_at first
  blogPost(slug: String!): BlogPost      # live only; drafts/scheduled → null
  relatedBlogPosts(slug: String!, first: Int = 3): [BlogPost!]!
  blogCategories: [BlogCategory!]!       # ordered by sort_order
}
```

- **Hidden posts:** every post query applies `live()`, so drafts, scheduled and soft-deleted posts can never be fetched.
- **`locale` filter:** `blogPosts(locale: "ar")` applies `availableIn('ar')`.
- **Related posts:** same category first, then posts sharing the most tags, then newest. Excludes the post itself, and live posts only.
- **`Team`:** gains `bio: Translation @translations`.

### 1.5 Backend tests (Pest; CI already runs pgsql, mysql, sqlite)

- **Visibility:** a draft, a scheduled post and a soft-deleted post are absent from `blogPosts` and `blogPost`; a published past post is present.
- **Locale and ordering:** `locale: "ar"` excludes posts without an Arabic title or body. `available_locales` is correct. Ordering is newest first. Pagination works.
- **Related posts:** same-category posts outrank tag matches, and the post itself is never included.
- **Sanitiser:** `<script>`, `onerror`, `style` and `<iframe>` are removed; allowed tags survive; `h2` ids are added, unique and Arabic-safe.
- **Computed fields:** reading time per locale; FAQ rows are cleaned.
- **Filament:** create a post in `en`, switch to `ar` and fill it; the slug stays English; publishing sets `published_at`; the table search works on the translatable title.
- **Schema:** `lighthouse:validate-schema` passes.

---

## 2. Frontend (`codetoon-front`)

### 2.1 Routes (`app/[locale]/blog`)

| Route | Content |
|---|---|
| `blog/page.tsx` | Paginated grid (12/page, `?page=n`), category chips, newest first |
| `blog/category/[slug]/page.tsx` | Same grid filtered by category, category SEO copy |
| `blog/[slug]/page.tsx` | Article page |

All three export `revalidate = 300`.

**Article page layout:**
- **Header:** breadcrumb trail; category, title, author (photo, name, title), published date, reading time.
- **Body:**
  - Cover image with alt text.
  - Table of contents built from the H2 `id`s in the body; it's hidden when there are fewer than 3 H2s.
  - The body itself, rendered as HTML (already sanitised by the CMS) inside a `.prose-article` wrapper.
  - FAQ as an accessible accordion (`<details>`/`<summary>`).
  - Tags.
- **Footer:** author box with bio, 3 related posts, and a CTA block that opens the existing contact modal.

**Untranslated Arabic:**
- `/ar/blog/<slug>`, when `available_locales` lacks `ar`, redirects with **307** to `/blog/<slug>`. That's temporary, because the translation may arrive later.
- `/ar/blog` and Arabic category pages request `locale: "ar"`, so they only list translated posts.

**Pagination:**
- `?page=1` canonicalises to the bare URL.
- `?page=n` (n > 1) has a self-referencing canonical, and its title includes the page number.
- An out-of-range page returns a 404.

**Navigation:**
- A "Blog" / "المدونة" item is added to the header (desktop and drawer) and the footer.
- A new `blog` message namespace holds en/ar copy for all UI strings: read time, "Table of contents", "Related posts", empty state, pagination, and so on.

**Typography:** a `.prose-article` stylesheet in `globals.css` built on logical properties (margins, list padding, blockquote border with `border-inline-start`). It's correct in RTL and leaves existing pages untouched.

### 2.2 Data layer

- `lib/graphql/queries.ts` gains four queries:
  - `GET_BLOG_POSTS`: the listing fields, without `body`.
  - `GET_BLOG_POST`: full post.
  - `GET_RELATED_BLOG_POSTS`.
  - `GET_BLOG_CATEGORIES`.
- `lib/server-data.ts` gains the following, all using `localize()` from `lib/i18n/cms.ts`:
  - `getBlogPosts({ page, category, tag }, locale)` (passes `locale` to the API).
  - `getBlogPost(slug, locale)`: returns `{ post, availableLocales }` so the page can redirect.
  - `getRelatedBlogPosts`.
  - `getBlogCategories`.
- The `FaqTranslation` and `ReadingTime` shapes are added to `localize()`'s translation-type detection, together with a test.
- `graphql/schema.graphql` is refreshed (`npm run schema:pull`) from the backend branch.

### 2.3 SEO

- **Metadata:**
  - The title is `seo_title || title`; the description is `seo_description || excerpt`, passed through `metaDescription()`.
  - Open Graph: `type: 'article'`, `publishedTime`, `modifiedTime`, `section` (category), `tags`, and the cover as image.
- **Alternates:** a new helper, `localeAlternatesFor(path, locale, availableLocales)`, emits only the available languages. `x-default` points to `en`.
- **JSON-LD** via `lib/structured-data.ts` (new builders `blogPosting`, `faqPage`, `blog`):
  - **Post:**
    - `WebPage` + `BreadcrumbList` (Home › Blog › Category › Post).
    - `BlogPosting`: `headline` ≤ 110 characters, `description`, `image`, `datePublished`, `dateModified`, `author` (a `Person` linked to the team member, `worksFor` the org), `publisher` (org), `articleSection`, `keywords`, `wordCount`, `inLanguage`, `mainEntityOfPage`.
    - `FAQPage` when FAQs exist.
  - **Listings:** a `CollectionPage` + `BreadcrumbList` + `Blog` (`blogPost` as an `ItemList` of the page's posts).
- **Sitemap:**
  - `/blog` and each category page, in en always and in `ar` when the category has at least one Arabic post.
  - Each live post with `lastModified = updated_at`, plus an `ar` URL and alternate only when it's available in Arabic.
  - The sitemap route uses `revalidate = 300`.
- **`llms.txt`:** a "Blog" section listing the 10 latest posts (title, URL, excerpt), revalidated every 5 minutes.

### 2.4 Frontend tests (Vitest; CI runs codegen → typecheck → tests → hermetic build)

- **Schema:** the new queries validate against the refreshed snapshot (the existing test covers this automatically).
- **Builders:** `blogPosting`, `faqPage` and `blog` (no blank values; ids resolve; headline cap; author Person).
- **Helpers:** TOC extraction from body HTML (H2s only, ids preserved, Arabic text); `localeAlternatesFor` omits `ar` when unavailable.
- **Localize:** the `FaqTranslation` and `ReadingTime` shapes, including English fallback per field.
- **Pages:** the Arabic redirect decision, a pure function `arabicFallback(availableLocales, locale)`.
- **Sitemap:** the entries for translated versus untranslated posts, through a pure builder.
- **Build:** the hermetic build passes with the CMS unreachable, so the blog pages render empty states rather than crashing.

### 2.5 Manual verification

- **Browser:** check `/blog`, a category page, a post with FAQ, `/ar/blog` and a translated `/ar/blog/<slug>` at 1440px and 375px. Confirm the redirect for an untranslated Arabic post.
- **Structured data:** run the local schema.org vocabulary check over all sitemap URLs, and the Rich Results Test on one post after deploy.
- **Regression:** existing English pages unchanged (text/height comparison against `master`, as done for the i18n launch).

---

## Delivery

Two PRs, merged and deployed **backend first**. The frontend's deploy runs codegen against the live schema, so it needs the new blog types to exist. Adding types is backward compatible, so deploying the backend first breaks nothing.

1. **Backend PR:** migrations, models, sanitiser, Filament resources, GraphQL, Team bio, tests.
2. **Frontend PR:** schema snapshot, data layer, pages, i18n copy, SEO, sitemap/llms, styles, tests.
