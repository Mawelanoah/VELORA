# VELORA FRAGRANCES — Premium Online Perfume Store (Demo)

A complete, modern, mobile-friendly static e-commerce demo for a South African perfume store.

**Brand:** Velora Fragrances  
**Currency:** South African Rand (R)  
**Design:** Luxury aesthetic — black, ivory, white, gold accents

---

## What’s Included

- Fully responsive homepage with announcement bar, navigation, hero, category cards, bestsellers, “Why shop with us”, offers placeholder, footer
- Functional product catalogue with search, category & price filters, sorting
- Product detail pages with notes, stock, description
- Working shopping cart (add / remove / quantity) that **persists in localStorage**
- Checkout form collecting name, phone, email, address — creates an order **enquiry** only (no fake payment success)
- Floating WhatsApp button with pre-filled enquiry message including cart items
- Search overlay
- Mobile navigation
- About, Contact, Policies pages
- Clear demo labelling on all sample products

---

## How to Run Locally

1. Open the project folder `velora-fragrances`
2. Serve the files with any static server, for example:

```bash
# Python 3
python -m http.server 8080

# or Node (if you have npx)
npx serve .
```

3. Open `http://localhost:8080` in your browser (or phone on the same network).

Alternatively open `index.html` directly in a browser (some features like cart persistence still work).

---

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of `velora-fragrances` (or push via git).
3. Go to **Settings → Pages**.
4. Source: Deploy from branch `main` (or `master`), folder `/ (root)`.
5. Save. Your site will be available at `https://YOUR_USERNAME.github.io/REPO_NAME/`.

**Important:** GitHub Pages is static only. It cannot securely hold private API keys or process real payments server-side.

---

## What Still Requires Real Business Information

| Item | Status |
|------|--------|
| WhatsApp number | Placeholder `YOUR_WHATSAPP_NUMBER` — replace in `js/script.js` and contact pages |
| Real product inventory, prices, stock | Demo data only — clearly labelled |
| Product authenticity claims | All demo products marked “Inspired” / demo |
| Delivery charges & times | Not promised — confirmed on enquiry |
| Returns policy details | Template only |
| Business email / social links | Placeholders |
| Yoco payment | Not connected — requires backend |

---

## Yoco Payment Integration (Production)

GitHub Pages **cannot** process payments securely.

Recommended approach for a real store:

1. **Backend** (choose one):
   - Supabase (Auth + Database + Edge Functions)
   - Node.js / Express on Railway, Render or Vercel
   - Netlify Functions / Vercel Serverless

2. **Flow**:
   - Frontend creates a payment request via your backend.
   - Backend uses Yoco secret key (never exposed in browser) to create a checkout session.
   - Customer is redirected to Yoco hosted payment page (or uses Yoco Web SDK).
   - Webhook or server-side verification confirms payment success.
   - Only then mark the order as paid and notify the customer.

3. **Never** put Yoco secret keys in frontend JavaScript or public repos.

4. Official Yoco docs: https://developer.yoco.com/

Until credentials are live, keep the current “order enquiry → WhatsApp” flow.

---

## Admin Dashboard

A production admin area needs:

- Real authentication (Supabase Auth, Auth0, or custom JWT)
- Server-side authorization for product CRUD, stock, orders, banners
- Database (Supabase Postgres, Firebase, etc.)

This demo does **not** include a functional admin with hardcoded passwords. Building one on static hosting alone would be insecure.

Suggested stack for production:

- **Frontend:** This static site or Next.js / Nuxt
- **Backend + Auth + DB:** Supabase
- **Payments:** Yoco via Edge Functions
- **Images:** Supabase Storage or Cloudinary

---

## File Structure

```
velora-fragrances/
├── index.html          # Homepage
├── shop.html           # Catalogue + filters
├── product.html        # Product detail
├── checkout.html       # Enquiry checkout
├── about.html
├── contact.html
├── policies.html
├── css/style.css
├── js/script.js        # Products, cart, search, checkout logic
├── assets/images/      # Product & category photos
└── README.md
```

---

## Customisation Checklist

1. Replace `YOUR_WHATSAPP_NUMBER` (format: `27821234567`)
2. Update product array in `js/script.js` with real data
3. Replace images in `assets/images/`
4. Update email, social links, policies
5. Add real Yoco integration via a backend before accepting payment
6. Test thoroughly on mobile devices

---

## Notes on Demo Products

All products are fictional demo data for layout and functionality testing. They are labelled “Demo” and “Inspired”. Do not present them as authentic designer fragrances for sale.

---

Built as a clean, conversion-focused static prototype. Ready for you to replace placeholders with real business data and connect a secure backend for live trading.