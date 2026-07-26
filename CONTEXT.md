# cms-demo

TinaCMS + React SPA template for NGO/Rotaract club/Starter websites. All brand theming comes from CMS settings — no code changes needed per organization.

## Setup

```bash
pnpm install
pnpm run dev
```

Opens at `http://localhost:5173`. TinaCMS admin at `http://localhost:5173/admin/index.html`.

## Origin

This repo was built iteratively:

- Initial scaffolding from TinaCMS + Vite
- Extended settings schema with 14 brand color fields (logo, favicon, colors)
- Replaced all hardcoded colors with CSS custom properties driven by settings
- Created tenant template system (`tenants/_template/`) for cloning per-NGO
- Created `scripts/setup-new-ngo.sh` for one-command NGO initialization

## Architecture

### Tech stack
- **TinaCMS** — headless CMS with Git-backed content
- **React 19** — SPA
- **Vite** — bundler
- **CSS Modules** — scoped styling

### Content types (collections)
Content lives in `content/` as markdown files.

| Collection | Path | Description |
|---|---|---|
| Page | `content/page/` | Static pages with sections (hero, about, services, team, testimonials, contact, CTA) |
| Team | `content/team/` | Team members |
| Testimonial | `content/testimonial/` | Testimonials |
| Settings | `content/settings/` | Global site config, brand colors, nav |

### Brand theming
All brand colors are in `content/settings/global.json → brand.colors` and injected as CSS custom properties. Every component uses `var(--*)` — no hardcoded brand colors in components. Structural tokens (`--white`, `--card-bg`, `--shadow-*`, `--radius-*`, `--font-*`) have defaults in `:root` in `styles.css`.

Color fields: `primary`, `primaryDark`, `primaryLight`, `accent`, `accentLight`, `accentHover`, `gold`, `goldLight`, `goldHover`, `green`, `greenLight`, `footerBg`, `heroBgStart`, `bodyBg`

### Routing
React Router with `BrowserRouter`. Routes resolve to page slugs in TinaCMS (`/blog` → loads `content/page/blog.mdx`). Hash links (`/#contact`) scroll to section anchors within a page.

## Template workflow

To create a new NGO site:

```bash
# Clone this repo
git clone https://github.com/swapnil-up/cms-demo.git my-ngo
cd my-ngo

# Remove git history
rm -rf .git

# Initialize for your NGO
bash scripts/setup-new-ngo.sh

# Delete demo content
rm content/team/*.md content/testimonial/*.md

# Delete template directory
rm -rf tenants

# Install and run
pnpm install
pnpm run dev
```

Then edit content via TinaCMS admin.

> **CI/CD caveats**: The `.github/workflows/` files reference repo secrets (`TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN`) that won't exist in your cloned repo. A push to `main` will trigger a GitHub Pages deploy that fails mid-build. If you clone this, either remove the workflows, add the secrets, or deploy via Vercel instead (Vercel ignores base-path config). Also update `TINA_BASE_PATH` and `VITE_BASE_PATH` in `deploy.yml` to match your repo name if you do use GH Pages.

## For agents

When editing:

1. **Content schemas** live in `tina/collections/`. After changing a schema, rebuild with `pnpm build-local` to regenerate types.
2. **Components** live in `src/components/`. Props must use generated types from `tina/__generated__/types` — never `Record<string, unknown>` or inline anonymous types.
3. **CSS** uses CSS Modules. Colors must use `var(--*)` custom properties — never hardcode hex/rgba values.
4. **Routing** uses React Router (`Link`).
5. **Build** with `pnpm build-local` — this runs TinaCMS type generation + Vite production build.
