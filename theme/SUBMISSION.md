# AI Product Engineer Assignment — Devesh

**To:** nj@troopod.io  
**Subject:** AI Product Engineer Assignment - Devesh

---

## 1. Access

| Item | Value |
|------|-------|
| Dev store URL | https://dartix-iat2frl4.myshopify.com/ |
| Storefront password | `skeech` |
| GitHub repo | `https://github.com/deveshmaurya1996/Troopod` |

Theme: stock Dawn + Purelane sections. Homepage template: `templates/index.json`.  
Setup steps used: `docs/store-setup.md`. Product seed CSV: `docs/products-seed.csv` (9 products; includes sold out, no image, long title).

---

## 2. Metafield and metaobject definitions

### Product metafields (`custom`)

| Key | Type | Purpose | Example |
|-----|------|---------|---------|
| `badge` | Single line text | Card pill on shop grid | Best seller / Top rated / New |
| `rating` | Decimal | Star rating on card | 4.8 |
| `review_count` | Integer | Review count on card | 237 |
| `benefit` | Single line text | Combo stack line label | Cuts grease instantly |

### Metaobject type: `purelane_review`

| Field | Type | Required |
|-------|------|----------|
| `title` | Single line text | Yes |
| `body` | Multi-line text | Yes |
| `author` | Single line text | Yes |
| `product_label` | Single line text | No |
| `rating` | Integer (1–5) | No |

Reviews section accepts either this metaobject list or section blocks (prototype copy ships as blocks so the page works before metaobjects exist).

---

## 3. Build notes

### What I’d flag about the original file

- One 148KB HTML dump with inline CSS/JS and base64 product art in CSS variables — fine as a design prototype, not a Shopify delivery surface.
- Products are CSS `background-image` spans, not media — bad for LCP, alt text, and merchant swaps.
- Review marquee duplicates the full card set in the DOM for infinite scroll — noisy for assistive tech.
- Prices and marketing copy are hardcoded — no theme-editor path.
- Two palettes stacked (dark V1, then light V2 override). What the browser shows is V2; that is the visual source of truth.
- Global selectors and a custom fixed nav would fight Dawn’s header/cart if dropped in raw.

### What I changed in the code (and why)

- Rebuilt as five Dawn sections with schemas/blocks so marketing can edit without a developer, and so add/remove/reorder in the theme editor stays safe.
- Shop cards pull title, media, price, compare-at, availability from Shopify products; badge/rating/review count from metafields.
- Hero stage, combo, and bundle **marketing** prices stay section settings. Shopify has no native “any 3 for ₹499” without a bundle app; inventing checkout logic would overbuild past the prototype.
- Replaced CSS backgrounds with `image_url` / `image_tag` (and empty-state media) for performance and a11y.
- Shared snippets (`purelane-product-card`, `price`, `badge`, `media`, `icon`) so similar cards are not forked per section.
- JS is scoped under `[data-purelane]`, idempotent for section reloads; `prefers-reduced-motion` kills reveal blur, marquee, hero autoplay, and parallax.
- Atmosphere is a light CSS gradient wash instead of the prototype’s heavy filtered water SVGs — keeps the colour ground without tanking CWV.
- Dawn header/footer hidden only on `template-index` so the homepage matches the composition without rewriting Dawn chrome.

### With more time

- Side-by-side pixel QA at 375 / 768 / 1180 against the HTML file, then tighten any spacing/type drift.
- Wire every hero slide / combo / bundle product picker after store seed and drop leftover placeholder slides.
- Optional: restore a lighter version of the water cinematics if Lighthouse still passes.
- Real mix-and-match bundle at checkout (app or Shopify Bundles) instead of marketing tiers → `#shop`.
- Playwright visual diffs + a Lighthouse budget on the published preview URL.

---

## 4. AI workflow notes

### What I delegated

- Prototype scrape: section boundaries, tokens, confirming V2 light as the live palette.
- Dawn baseline clone, base64 SVG extraction into theme assets.
- First-pass CSS port and section schema scaffolding.

### Where it failed me

- Pixel fidelity: models drift into redesign or over-abstraction; geometry had to be held to the file.
- Shopify Liquid details (`image_tag` args, metafield `.value`, theme-editor re-init) need a human pass, not blind accept.
- Small production traps (marquee clone a11y, newline-split feature lists, empty product blocks) are easy to generate wrong.

### What I’d systematise for twenty more of these

1. Spec → section skeleton (schema + empty Liquid + token CSS) from a fixed checklist.
2. A private shared primitive pack: card, price, rail, reveal, reduced-motion.
3. Playwright: HTML reference vs theme preview at fixed widths.
4. A seed agent checklist: metafields, sold-out / no-image / long-title, editor empty-state pass.

---

## 5. Commit history (intact)

```
56a1fd5 docs: add submission notes metafields and store seed
d8faae8 feat: wire Purelane homepage and atmosphere
349abd6 feat: add Purelane combos and bundles sections
562d63b feat: add Purelane reviews section
caba3b0 feat: add Purelane hero section
f9c02f8 feat: add Purelane shop section
85f9a3a feat: add reusable Purelane Liquid snippets
013c550 feat: add Purelane shared CSS JS and product SVG assets
2dfc624 chore: pull Dawn baseline
```

Sections: `purelane-hero`, `purelane-shop`, `purelane-combos`, `purelane-bundles`, `purelane-reviews` (+ `purelane-atmosphere` for backdrop only).

---

## 6. Before you hit send

1. Push this `theme/` repo to GitHub → paste repo URL into section 1 (still blank).  
2. Import `docs/products-seed.csv`, create metafields/metaobject above, attach SVGs, assign products in the theme editor, push the theme to [Dartix](https://dartix-iat2frl4.myshopify.com/).  
3. Attach this file (or paste the body) to an email:

**To:** nj@troopod.io  
**Subject:** AI Product Engineer Assignment - Devesh
