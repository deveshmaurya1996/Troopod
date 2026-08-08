# Store setup checklist

## 1. Partner + development store

1. Create a free [Shopify Partner](https://partners.shopify.com/) account
2. Partners → Stores → Add store → Development store
3. Name it something like `purelane-devesh`
4. Enable password protection (Online Store → Preferences) and note the password

## 2. Currency

Settings → Store details / Markets → set currency to **INR** so prices match the prototype.

## 3. Seed products

1. Products → Import → upload `docs/products-seed.csv`
2. After import, attach SVG mockups from `assets/purelane-p-*.svg` to products that should have images
3. Leave **Gentle hydrating liquid handwash** without an image
4. Confirm **Non-toxic toilet cleaner** is sold out (qty 0)
5. Confirm the long-title laundry product kept its full title

Suggested image map:

| Product | Asset |
|---------|-------|
| Tap cleaner | `purelane-p-tap.svg` |
| Kitchen cleaner | `purelane-p-kitchen.svg` |
| Copper bronze & brass | `purelane-p-metal.svg` |
| Washing machine cleaner | `purelane-p-wm.svg` |
| Dishwash gel | `purelane-p-dish.svg` |
| Floor cleaner | `purelane-p-floor.svg` |
| Toilet cleaner | `purelane-p-toilet.svg` |
| Laundry (long title) | `purelane-p-laundry.svg` |

## 4. Metafields / metaobjects

Follow `docs/metafields.md`, then fill badge / rating / review_count / benefit on products.

## 5. Push theme

```bash
cd theme
shopify theme push --unpublished
shopify theme publish
```

Or connect in the admin: Online Store → Themes → Add theme → Upload zip of this folder.

## 6. Homepage

Theme editor → Homepage should already use the Purelane sections from `templates/index.json`.

Pick products into:

- Purelane shop → Products
- Purelane hero → slide product pickers
- Purelane combos → each combo product list
- Purelane bundles → decorative products per tier

## 7. Deliverables

- Store URL + password
- GitHub repo URL
- `docs/metafields.md`
- `SUBMISSION.md`
