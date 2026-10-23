# Little Fern — café demo

Specialty coffee and brunch café, set up for Austin, Texas (USD, SMS confirmations). A premium, multi-page demo site with working booking. Plain HTML, CSS and JavaScript: no build step, no server.

## Rebrand it for a new client

Edit **`config.js`** only. Name, tagline, address, phone, WhatsApp number, email, opening hours, currency (`currency: 'AED' | 'KWD' | 'USD'…` plus `currencyDigits`), date style (`locale`), menu, seating areas, table count and reviews all flow into every page, the footer, the "open now" status, the booking rules and the search-engine structured data.

Photos are Unsplash demo images referenced by ID in `config.js` and the HTML. Swap them for the client's own photos before going live.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Hero sentence with the café's photos set inside it, what's on the counter, the coffee, brunch, reviews, visit |
| `menu.html` | The public menu with dietary tags and search. Opened from a table code (`menu.html?table=N`) it becomes the table ordering screen: add items, notes, place order, live order tracking, call a server, ask for the check |
| `book.html` | Reservations: when → where to sit (patio, window bar, long table, lounge) → details |
| `reviews.html` | Rating summary with filter bars, sort, and a form to post a review |
| `tables.html` | Owner tool, not linked anywhere on the site: printable QR codes, one per table, each opening `menu.html?table=N` |

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

To publish: GitHub repo → Settings → Pages → deploy from the `main` branch, root folder.

## How it is built

- `core.js` / `core.css`: shared engine (header, footer, booking steps, day and time pickers, confirmation ticket with a WhatsApp confirmation, or SMS when `whatsapp` is empty, and a calendar invite, reviews, lightbox, toasts, JSON-LD). Same files in all three demo sites.
- `app.js`: this site's page behaviour. `theme.css`: this site's look.
- Cross-page view transitions, one orchestrated entrance per page, `prefers-reduced-motion` respected, keyboard and screen-reader friendly pickers (real radio inputs), mobile first.

## Before going live

- **Bookings and reviews are a demo.** Availability is generated, and bookings, orders and new reviews are saved only in the visitor's browser (`localStorage`). Connect `saveBooking` / the review form in `core.js` to the client's real booking system, WhatsApp Business API or a sheet.
- Replace the demo photos, address, phone and reviews with the client's own.
