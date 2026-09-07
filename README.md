# Posh — Angular rebuild

The [Posh landing page](https://prium.github.io/Posh/v2.1.0/) rebuilt as an Angular
application: standalone components, signals, typed interfaces, control flow, routing
and a reactive form.

Built with Angular 22 (`ng new`) — no Bootstrap, no jQuery, no copied template markup.
The styling is hand-written SCSS that mirrors the original's Montserrat type, `#007aff`
primary and near-black `#0c151a` demo section.

## Running it locally

```bash
npm install
npm start
```

Then open <http://localhost:4200>. To produce a production build:

```bash
npm run build
```

## How the page was split into components

The original is one long HTML file, so the first job was finding the seams. Each visual
band of the page became a standalone component with a single responsibility, and every
repeated block became data rather than duplicated markup. `NavbarComponent` reproduces
the original's four dropdowns — Homes, Pages, Components and Docs — from a `NavItem[]`
rather than hand-written markup: a `kind` discriminator (`simple` / `nested` / `mega`)
picks the dropdown shape via `@switch`, so the flat Homes list, the Pages menu with its
nested submenus, and the wide Components mega-menu card all render from one template.
It owns `menuOpen`, `openDropdown` and `openSubmenu` signals, and emits `menuToggled` so
the shell — not the navbar — decides to lock body scroll. Those same signals are driven by
hover on desktop and by clicks where there is no hover (touch, narrow screens), so one
piece of state serves both. The original's dropdown targets
are demo pages that don't exist in this rebuild, so each link points at the matching
section of this app instead (About routes to `/about`, the rest to the demos, features or
contact sections). `HeroComponent` takes its headline, subtext and rotating words as `input()`s and
emits `primaryCtaClicked` instead of wiring an inline `onclick`, so the same hero could
be reused on another page with different copy. The demo grid is the clearest win: a
`Showcase` interface describes one tile, `DemoService` holds all 39 of them, a
presentational `ShowcaseCardComponent` renders one — caption above the screenshot, as in
the original — and `ShowcaseGridComponent` repeats it with `@for`. The original packs the
tiles as a masonry, so the grid builds its columns itself: a `computed()` over a
`columnCount` signal (3/2/1, following the viewport) sends each tile to whichever column is
currently shortest, measured with the `ratio` stored on each `Showcase`. Tiles sit directly
under the one above rather than stretching to a row, and the columns finish within a few
percent of each other. A card click travels up
as an `@Output` to the page, which names that demo in the contact form's subject, since
the demo pages the original links to don't exist here. The four feature callouts collapsed from four hard-coded paragraphs into a
`Feature[]` rendered with `@for`. `ContactComponent` is new — the original had no
working form. It lives on its own `/contact` route rather than on the landing page, so the
recreated page keeps the original's section flow; the navbar's Pages → Contacts links go
there, and clicking a demo tile opens it with `?subject=…` already filled in. It uses a
reactive form with custom validators (`notBlank`, `minTrimmedLength`,
`realisticEmail`, plus a group-level `allFieldsFilled`), a submit button disabled until
the form is valid, and a signal-backed "thanks" state on success. `FooterComponent` is
static apart from the copyright year, which is bound from a live `Date`. Routing adds an
`/about` page: the navbar uses `routerLink`, and both pages render through
`<router-outlet>` in `App`.

## Project structure

```
src/app/
├── app.ts / app.html          # shell: navbar + <router-outlet> + footer
├── app.routes.ts              # '' → Home, 'about', 'contact' (all lazy-loaded)
├── models/                    # NavItem/NavGroup/NavLink, Showcase, Feature,
│                              # ContactRequest, SocialLink
├── services/demo.service.ts   # injected content source for all lists
├── components/
│   ├── navbar/                # @for + @switch dropdowns, menu signals, @Output
│   ├── hero/                  # @Input copy, @Output CTA, typewriter signal
│   ├── showcase-card/         # @Input showcase, @Output selected
│   ├── showcase-grid/         # @for + signal/computed masonry columns
│   ├── features/              # @for over Feature[]
│   ├── contact/               # reactive form + custom validators
│   ├── cta-banner/
│   └── footer/                # live Date year + @for social links
└── pages/
    ├── home/                  # composes the landing page sections
    ├── about/                 # second route
    └── contact/               # third route; reads ?subject= from the URL
```

## Concept checklist

| Requirement | Where |
| --- | --- |
| Components | every section under `src/app/components` |
| `@for` control flow | navbar dropdowns, showcase grid, features, footer socials, about timeline |
| `@if` / `@else` / `@switch` | showcase empty state, contact vs. thanks state, navbar dropdown kinds |
| Typed interface + list rendering | `Showcase` → `ShowcaseCardComponent` |
| `input()` | `Hero`, `ShowcaseCard`, `CtaBanner`, `Contact.subject` |
| `output()` | `Navbar.menuToggled`, `Hero.primaryCtaClicked`, `ShowcaseCard.selected` → `ShowcaseGrid` → `Home`, `Contact.messageSent` |
| Signals | `Navbar.menuOpen` / `openDropdown` / `openSubmenu`, `ShowcaseGrid.columnCount` + `computed()`, `Home.contactSubject`, `Contact.submitted` |
| Dependency injection | `DemoService` injected into navbar, grid, features, about |
| Routing | `app.routes.ts`, `routerLink`, `<router-outlet>`, `?subject=` query param |
| Forms | `ContactComponent` with custom validators and disabled-until-valid submit |
| Live data binding | footer copyright year from `new Date()` |

## Credits

Design based on the Posh template by ThemeWagon; demo screenshots are loaded from the
original template's public assets. Rebuilt in Angular as a bootcamp assessment.

Made with ❤️ by Lamlam.
