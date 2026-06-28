# Nera24 – Static Site Summary (User Point of View)

A static, bilingual (CZ/EN) single-page site for the **Nera24** 24-hour paddleboard race in Neratovice on the Elbe river. There is no real backend rendering for the static parts — all visible text lives in plain JS data files and is injected into one container (`#content`) when a nav item is clicked.

- **Entry page:** `docs/index.html`
- **Language switch:** CZ / EN flag buttons (top right). Every text block exists as `{ cz: ..., en: ... }`.
- **Default language:** `cz` (set in `docs/public/src/logic/app.js`).

---

## Navigation bar

Defined in `docs/index.html` (lines 100–131). Menu labels are translated via `data-i18n` keys, whose text lives in `docs/public/src/logic/app.js` (the `nav.*` keys, lines 8–48).
ad
| Nav item (CZ / EN)        | data-target / key   | Content variable      | Content file |
|---------------------------|---------------------|-----------------------|--------------|
| **Info**                  | `info`              | `intro_info`          | `docs/public/data/intro_info.js` |
| **Propozice / Proposition** | `proposition`     | `proposition_info`    | `docs/public/data/propositions.js` |
| **Historie / History** ▾  | `history`           | `history_info`        | `docs/public/data/history_info.js` |
| &nbsp;&nbsp;↳ O Závodu / About Race | `about_race` | `about_race` (= alias of `history_info`) | `docs/public/data/history_info.js` (line 38) |
| &nbsp;&nbsp;↳ Výsledky / Results | `results`      | `results_info`        | `docs/public/data/history_info.js` (lines 39–80) |
| &nbsp;&nbsp;↳ Fotky / Photos | `photos`         | `photos`              | `docs/public/data/history_info.js` (lines 82–99) |
| **Kontakt / Contact**     | `contact`           | `contact`             | `docs/public/data/contacts.js` |
| **CZ / EN** flags         | —                   | language switch       | `docs/public/src/logic/app.js` (`changeLanguage`) |

**How the nav works:** clicking a menu item runs `showContent()` in `docs/public/src/logic/app_nav_bar2.js` (the `switch`, lines 38–73). It reads the current language (`i18next.language`), picks the matching content variable, and sets `#content`'s innerHTML. "History" is a dropdown (submenu) with 3 sub-items. Hover opens the submenu on desktop; the hamburger menu + tap handles mobile (`app.js` lines 95–215, `app_nav_bar_mobile.js`).

> Note: `app_nav_bar.js` (`fetchDataAndUpdateTable`) and `online.js` deal with the live **online results tables**, which are dynamic (fetched from `/api/...`) — not part of the static content.

---

## Where each piece of user-visible information lives

### Global race facts — `docs/public/src/config.js`
- `RACE_NAME`: "SUP Nera 24"
- `RACE_DATE`: "18.–19. 9. 2026" — shown in the header and reused across Info/Proposition.
- `RACE_REGISTRATION_FORM`: Google Form URL — reused in Info and Proposition registration links.

### Header — `docs/index.html` (lines 90–98)
- Logo (`logoW.svg`), and the race date `<h1 id="header-race-date">` filled from `config.RACE_DATE` (`app.js` line 75).

### Page metadata / SEO — `docs/index.html` (lines 3–82)
- Title, descriptions (CZ + EN), keywords, canonical + hreflang links, Open Graph / Twitter cards, and JSON-LD `SportsEvent` structured data (date 2026-09-18 → 2026-09-20, location Neratovice).

### "Info" tab — `docs/public/data/intro_info.js`
- Photo (`Mara.jpg`), event date, location (link to map at mapy.cz), race types (24h / 12h / marathon → links to Proposition), and registration form link.

### "Proposition" tab — `docs/public/data/propositions.js`
The richest content. Contains:
- About the race + basic info (date, location map, registration, payment notes).
- Facilities & equipment (sleeping space, refreshments, mandatory leash + light, no drafting).
- **Nera 24 (24h) category:** teams 1–5 members, start Fri 18.9.2026 18:00, end Sat 19.9.2026 18:00, course info; entry fees (solo/teams, before/after 31.7.2026).
- **12h category:** solo & pairs only, Sat 6:00–18:00; entry fees.
- **Marathon 43.2 km category:** solo only, start Sat 10:00; entry fees.
- ⚠️ The CZ and EN versions are slightly out of sync (e.g. some start/end times and the 200 km bonus appear only in EN; CZ has a duplicated "Maraton" heading around lines 66–76). Commented-out alternatives sit at the bottom (lines 149–163).

### "History" / "About Race" tab — `docs/public/data/history_info.js` (lines 1–38)
- Photo (`labe.jpg`) + narrative history (first race 2021, handicapped participants since 2023, 2024 floods, growing team participation). `about_race` is an alias of `history_info`.

### "Results" sub-tab — `docs/public/data/history_info.js` (lines 39–80)
- Photo (`final.jpg`) + links to Google Sheets: Records, and results for 2025, 2024, 2023, 2022, 2021.

### "Photos" sub-tab — `docs/public/data/history_info.js` (lines 82–99)
- External photo album links: 2025 & 2024 (Zonerama), 2023 (Rajče).

### "Contact" tab — `docs/public/data/contacts.js`
- Richard Wiesner, tel +420 777 685 198, email richard.wiesner@mcsup.cz (same CZ/EN).

### Images — `docs/public/img/`
- `logoW.svg` (logo), `Mara.jpg` (Info), `labe.jpg` (History), `final.jpg` (Results), `og-image.jpg` (social), `cz-flag.png` / `en-flag.png` (language buttons), plus background/pattern assets.

---

## SEO & indexing (how search engines find the site)

The site is built so search crawlers (Google, Bing, etc.) can discover and index it. The relevant pieces:

### Hosting / domain
- **Custom domain:** `www.nera24.cz` — set by `docs/CNAME` (GitHub Pages). The site is served as static files from the `docs/` folder.
- A small inline script in `docs/index.html` (lines 83–87) **redirects the bare `nera24.cz` to `www.nera24.cz`**, so there's one canonical hostname.

### `docs/robots.txt`
- Allows all crawlers (`User-agent: *`, `Allow: /`).
- **Blocks** the internal scripts folder `/public/src/` from indexing (the CSS/JS logic — not useful in search results).
- Points crawlers to the sitemap: `https://www.nera24.cz/sitemap.xml`.

### `docs/sitemap.xml`
Lists the URLs crawlers should index, each with `lastmod` (2025-03-23), `changefreq`, and `priority`:
| URL | priority | changefreq |
|-----|----------|------------|
| `/` (home) | 1.0 | weekly |
| `/?content=info` | 0.8 | monthly |
| `/?content=proposition` | 0.8 | monthly |
| `/?content=history` | 0.7 | monthly |
| `/?content=results` | 0.7 | monthly |
| `/?content=contact` | 0.6 | monthly |

> ⚠️ Caveat: these `?content=...` URLs are listed for crawlers, but the site doesn't actually read that query parameter to pre-select a tab — all tabs render client-side into the same `#content` div via JS. So a crawler following a sitemap URL still lands on the default (Info) view. The sitemap mainly signals that these logical sections exist.

### In-page meta tags — `docs/index.html` `<head>` (lines 3–82)
These tell browsers and search/social tools what the page is:
- **`<title>`** (line 7): bilingual, keyword-rich — "Nera24 - 24hodinový paddleboardový závod v Neratovicích | 24 Hour Paddleboard Race".
- **`<meta name="description">`** (lines 9–10): one CZ + one EN description (note: two description tags — search engines typically use only the first).
- **`<meta name="keywords">`** (line 11): SUP/paddleboard race keywords.
- **`<meta name="robots" content="index, follow">`** (line 13): explicitly tells crawlers to index the page and follow links.
- **`<link rel="canonical">`** (line 15): canonical URL `https://www.nera24.cz/` — avoids duplicate-content penalties.
- **`hreflang` alternates** (lines 17–19): declares CZ, EN, and `x-default` versions for international/language targeting.
- **Open Graph tags** (lines 21–28): title, description, image (`og-image.jpg`), URL, locale — controls how the link looks when shared on Facebook/messengers.
- **Twitter Card tags** (lines 30–35): `summary_large_image` preview for Twitter/X.
- **Favicons / manifest** (lines 38–42): icons + `site.webmanifest` (PWA-style metadata).
- **JSON-LD structured data** (lines 52–82): a `SportsEvent` schema.org block — name, description, **start/end dates (2026-09-18 → 2026-09-20)**, location (Neratovice, Středočeský kraj, CZ), organizer, image, `eventStatus: EventScheduled`, sport: Paddleboarding. This is what lets Google show rich event results (date, place) directly in search.

### Indexing-related file map
| Purpose | File |
|---------|------|
| Allow/deny crawlers + sitemap pointer | `docs/robots.txt` |
| List of indexable URLs | `docs/sitemap.xml` |
| Custom domain (GitHub Pages) | `docs/CNAME` |
| Title, meta description/keywords, robots, canonical, hreflang, OG/Twitter, JSON-LD | `docs/index.html` (`<head>`) |

---

## Visual style

Defined in `docs/public/src/style.css` (page chrome + content) and `docs/public/src/table.css` (results tables). The palette is declared once as CSS variables in `:root` (`style.css` lines 3–14) and reused everywhere.

### Color palette
The whole site is a **blue monochrome theme** on a white background, with grays for tables.

| Variable                  | Value             | Swatch hint | Used for |
|---------------------------|-------------------|-------------|----------|
| `--primary-dark-blue`     | `rgb(28, 54, 98)` | navy        | Default body text, all headings, nav/menu text |
| `--primary-bright-blue`   | `rgb(13, 119, 189)` | vivid blue | Links (`.href1`), hover/active nav item, hamburger hover, highlighted "after 31.7." prices |
| `--primary-medium-blue`   | `rgb(98, 171, 218)` | mid blue   | **Nav bar background**, photo borders, buttons, link hover color |
| `--primary-light-blue`    | `rgb(195, 224, 242)` | pale blue | Submenu background (desktop hover + mobile), table header/row backgrounds |
| `--secondary-dark-gray`   | `rgb(175, 175, 175)` | gray       | Table "DNF"/inactive cells |
| `--secondary-light-gray`  | `rgb(213, 211, 211)` | light gray | Secondary table shading |
| `--accent-blue`           | `rgb(144, 189, 217)` | accent blue | Declared, lightly used |
| `#ffcccc` / `#ccffcc`     | light red / green | red/green   | Table status cells only (`table.css` — negative/positive) |
| `white`                   | `#fff`            | white       | Header title text, button fill, hamburger lines, page background |

### Typography
- **Font:** `Roboto` (Google Fonts, weights 300/400/500/700), falling back to Arial, sans-serif (`style.css` line 1, 17).
- **Headings** (all navy, defined as classes, not `<h>` tags):
  - `.heading1` — 18px, weight 750, **UPPERCASE** (section titles like categories, "PŘEDBĚŽNÉ PROPOZICE").
  - `.heading2` — bold, smaller (sub-section labels).
  - `.heading3` — 18px, weight 750 (e.g. "Termín konání", "Výsledky").
  - `.heading4` — 16px, weight 600 (e.g. "Startovné" fee blocks).
- **Header `<h1>`** (race date): 22.5px, white.

### Layout & components
- **Header** (`style.css` 21–63): sticky top bar with a photo background (`background_header.jpg`), white logo + white race-date text overlaid.
- **Nav bar** (126–257): sticky strip below the header, **medium-blue background**; horizontal menu on desktop. Hover/active item turns bright-blue; "History" submenu drops down on hover with a pale-blue background.
- **Background pattern** (108–118): a faint watermark (`patternS.jpg`) fixed behind the content at `opacity: 0.25`.
- **Content photos** (305–349): rounded images (`border-radius` 15–20px) with a 4px medium-blue border; float right (History) or left (Info/Results), wrapping into a flex column on mobile.
- **Buttons** (72–93): white fill, 4px medium-blue border, navy text, rounded; fill turns medium-blue on hover.
- **Links** (`.href1`, 291–302): bright-blue, no underline, fade to medium-blue on hover.

### Responsive behavior (`@media max-width: 720px`, lines 359–539)
- Desktop horizontal menu collapses into a **hamburger** (top-right, medium-blue square) that slides a vertical menu panel in from the right (~38% width).
- Submenus expand inline (pale-blue) with a rotating ▼ arrow; language switcher becomes larger tap targets.
- Floated content photos become centered, full-width.

> Colors are duplicated at the top of `table.css` (same `:root` variables) so the results tables share the identical palette.

---

## Quick file map

| What the user sees           | File |
|------------------------------|------|
| Page shell, nav bar, SEO/meta | `docs/index.html` |
| Visual style, colors, layout | `docs/public/src/style.css` |
| Results-table styling        | `docs/public/src/table.css` |
| Race name / date / reg link  | `docs/public/src/config.js` |
| Nav labels + language logic  | `docs/public/src/logic/app.js` |
| Nav → content switching      | `docs/public/src/logic/app_nav_bar2.js` |
| Mobile hamburger menu        | `docs/public/src/logic/app.js`, `app_nav_bar_mobile.js` |
| Info content                 | `docs/public/data/intro_info.js` |
| Proposition content          | `docs/public/data/propositions.js` |
| History / About / Results / Photos | `docs/public/data/history_info.js` |
| Contact content              | `docs/public/data/contacts.js` |
| Images                       | `docs/public/img/` |
