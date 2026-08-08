# Metafield and metaobject definitions

## Product metafields

Namespace: `custom`

| Key | Type | Used by | Example |
|-----|------|---------|---------|
| `badge` | Single line text | Shop product cards | `Best seller`, `Top rated`, `New` |
| `rating` | Decimal | Shop product cards | `4.8` |
| `review_count` | Integer | Shop product cards | `237` |
| `benefit` | Single line text | Combo stack labels | `Cuts grease instantly` |

Create in **Settings → Custom data → Products**.

## Metaobject: `purelane_review`

| Field | Type | Required |
|-------|------|----------|
| `title` | Single line text | Yes |
| `body` | Multi-line text | Yes |
| `author` | Single line text | Yes |
| `product_label` | Single line text | No |
| `rating` | Integer (1–5) | No (defaults to 5 in Liquid) |

Create in **Settings → Custom data → Metaobjects**.

Wire entries into the Purelane reviews section via the **Reviews (metaobjects)** setting, or use section blocks (defaults ship with the prototype copy).
