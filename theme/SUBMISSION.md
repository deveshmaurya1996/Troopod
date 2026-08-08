# AI Product Engineer Assignment — Devesh

**To:** nj@troopod.io  
**Subject:** AI Product Engineer Assignment - Devesh

---

## 1. Access

| Item | Value |
|------|-------|
| Dev store URL | https://dartix-iat2frl4.myshopify.com/ |
| Storefront password | `skeech` |
| GitHub repo | https://github.com/deveshmaurya1996/Troopod |

Theme: stock Dawn + Purelane sections. Homepage: `theme/templates/index.json`.  
Setup: `theme/docs/store-setup.md`. Product seed CSV: `theme/docs/products-seed.csv` (9 products; includes sold out, no image, long title).

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

Reviews section accepts this metaobject list or section blocks (prototype copy ships as blocks so the page works before metaobjects exist).

---

## 3. Build notes

### What I’d flag about the original file

- One large HTML dump with inline CSS/JS and base64 product art — fine as a design prototype, not a Shopify delivery surface.
- Products are CSS `background-image` spans, not media — bad for LCP, alt text, and merchant swaps.
- Review marquee duplicates cards for infinite scroll — needs careful a11y handling.
- Prices and marketing copy are hardcoded — no theme-editor path.
- Two palettes stacked (dark V1, then light V2 override). V2 light is the visual source of truth.
- Global selectors and a custom fixed nav would fight Dawn’s header/cart if dropped in raw.

### What I changed (and why)

- Rebuilt as merchant-editable Dawn sections with schemas/blocks.
- Shop cards pull title, media, price, compare-at, availability from Shopify products; badge/rating/review count from metafields.
- Hero / combo / bundle marketing prices stay section settings (no fake checkout bundle logic).
- Shared snippets: `purelane-product-card`, `price`, `badge`, `media`, `icon`, `hero-bottle`.
- JS scoped under `[data-purelane]`; respects `prefers-reduced-motion`.
- Atmosphere uses the prototype water SVG layers (inlined so Dawn’s empty-div rules cannot hide them).
- Purelane ticker / header / footer on the homepage; Dawn chrome hidden only on `template-index`.
- Hero stage autoplays 1→2→3 with SVG bottle fallbacks when no products are picked.
- Review rail duplicates cards for a seamless CSS marquee loop.

### With more time

- Side-by-side pixel QA at 375 / 768 / 1180 against the HTML file.
- Wire every hero / combo / bundle product picker after full store seed.
- Real mix-and-match bundle at checkout (Shopify Bundles / app).
- Playwright visual diffs + Lighthouse budget on the published URL.

---

## 4. AI workflow notes

### What I delegated

- Prototype scrape: section boundaries, tokens, confirming V2 light as the live palette.
- Dawn baseline clone, SVG extraction into theme assets.
- First-pass CSS port and section schema scaffolding.

### Where it failed me

- Pixel fidelity: models drift into redesign; geometry had to be held to the file.
- Shopify Liquid details (`image_tag`, metafield `.value`, section re-init) need a human pass.
- Production traps (empty-div CSS hiding backgrounds, broken marquee clone nesting) needed live DOM checks.

### What I’d systematise for twenty more of these

1. Spec → section skeleton (schema + empty Liquid + token CSS) from a fixed checklist.
2. Shared primitive pack: card, price, rail, reveal, reduced-motion.
3. Playwright: HTML reference vs theme preview at fixed widths.
4. Seed checklist: metafields, sold-out / no-image / long-title, editor empty-state pass.

---

## 5. Repo layout

GitHub: https://github.com/deveshmaurya1996/Troopod (`main`)

```
theme/          Dawn + Purelane sections (deployable theme)
reference/      purelane-homepage.html prototype
README.md
```

Sections: `purelane-atmosphere`, `purelane-ticker`, `purelane-header`, `purelane-hero`, `purelane-reviews`, `purelane-combos`, `purelane-bundles`, `purelane-shop`, `purelane-footer`.
