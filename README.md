# 🪔 Pujo 2026 — Kolkata Durga Puja Pandal & Metro Guide

> **“Kolkata Pujo, One Guide.”**  
> Discover the city’s most iconic pandals, plan your route by Metro, check exact walking times, view latest 2026 preview photography, open exact Google Maps coordinates, and curate your personalized Puja wishlist.

---

## 🌟 Core Highlights

* **Primary User Journey:**  
  `Discover Pandal` → `View Pandal` → `See Latest Photos` → `Check Metro Route` → `Open Exact Google Maps Coordinates` → `Save to Wishlist`
* **Mobile-First & Ultra-Fast:** Designed specifically for people walking the streets of Kolkata during the festive rush. Includes sticky bottom navigation, large touch targets, minimal typing, and instant filters.
* **Editorial Aesthetic:** Warm ivory, deep charcoal, vermillion/sindoor accents, and muted heritage gold typography.
* **Smart Metro Integration:** Station-to-Pandal relationship engine covering the **Blue Line (North-South)**, **Green Line (East-West)**, and **Purple Line**. Displays precise walking distances in meters and walking durations in minutes.
* **Exact Geolocation:** Every pandal features exact latitude/longitude coordinates and direct Google Maps links that open directly at the pandal entrance.
* **Plan My Pujo (Route Planner):** Generate sequential multi-stop walking/metro itineraries with total distance and time estimates, plus one-click multi-stop Google Maps routes.
* **Photo Gallery & Lightbox:** Fullscreen mobile-friendly lightbox with swipe, next/previous controls, counter, and authorized Instagram attribution.
* **Authorized Instagram Pipeline:** Server-side API endpoints (`/api/instagram/sync` and `/api/instagram/posts`) designed for official Meta Graph API integration with caching and environment secret protection.
* **Admin & Data Management Portal (`/admin`):** Full UI to add or edit pandals, themes, descriptions, coordinates, and trigger sync pipelines without touching frontend code.

---

## 🏗️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Mapping:** Leaflet & OpenStreetMap interactive tiles with custom SVG pins + Direct Google Maps URL schemes
* **State Management:** Reactive Client Context with `localStorage` persistence

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone or navigate into the repository
cd Pandale

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` to add your credentials:

```ini
# Google Maps Platform (Optional: Built-in Leaflet map works out of the box)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GOOGLE_MAPS_API_KEY=

# Meta / Instagram Graph API
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=

# Database (PostgreSQL / Supabase)
DATABASE_URL=
```

*(Note: The application includes full fallback datasets and client-side map rendering, so it runs immediately even without API keys!)*

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your mobile or desktop browser.

### 4. Production Build & Test

```bash
npm run build
npm start
```

---

## 📱 Key Routes & Pages

| Route | Description |
| :--- | :--- |
| `/` | **Homepage:** Hero search, circuit zones, featured pandals, interactive Metro picker, latest photo feed, and planner CTA. |
| `/pandals` | **Pandal Catalog:** Search by name/theme/locality, multi-zone filters, Puja Day filters (Shashti through Dashami & Tonight), crowd level, sorting, Grid/Map/Split view toggle. |
| `/pandal/[slug]` | **Pandal Detail Page:** Large hero, crowd indicator (estimated/community reported), how to reach, walking time, exact "Check Out in Google Maps →" button, and categorized photo gallery. |
| `/metro` | **Metro Transit Guide:** Kolkata Metro station selector, lines filter (Blue, Green, Purple), and mapped nearby pandals with walking durations. |
| `/planner` | **Plan My Pujo:** Interactive multi-stop itinerary builder with transit hops and multi-stop Google Maps navigation. |
| `/wishlist` | **My Wishlist:** Saved pandals saved locally on your device with direct map actions and one-click conversion to a route. |
| `/map` | **Interactive Map:** Fullscreen map view showing all pandal and metro pins. |
| `/admin` | **Admin Portal:** Live interface to add/edit pandals, coordinates, and test the Instagram API sync pipeline. |

---

## 🔐 Instagram & Google Maps API Architecture

### Instagram Graph API Pipeline
1. Client requests sync via `POST /api/instagram/sync` with `{ pandalId: "..." }`.
2. The server route reads `INSTAGRAM_ACCESS_TOKEN` securely from server environment variables (never exposed to the client).
3. Connects to `graph.instagram.com/me/media` to fetch authorized posts.
4. Normalizes caption, media URL, thumbnail, permalink, and username into the standardized `InstagramPost` schema.
5. In development or prior to credential entry, the application gracefully provides verified preview content marked with clear authorization badges.

### Google Maps Navigation
* "Check Out in Google Maps" links use precise geocoding parameters:
  `https://www.google.com/maps/search/?api=1&query={lat},{lng}&query_place_id={google_place_id}`
* Walking directions use:
  `https://www.google.com/maps/dir/?api=1&origin={station}&destination={lat},{lng}&travelmode=walking`

---

## 📄 License
MIT © 2026 Pujo 2026 Kolkata Guide.
