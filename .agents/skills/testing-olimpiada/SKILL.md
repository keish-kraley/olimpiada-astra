# Testing the Olimpíada Astra Site

## Quick Start

```bash
npm install
npm run dev    # starts on port 3000
npm run build  # production build check
npm run lint   # lint check (expect warnings about <img> in admin pages — these are acceptable)
```

## Architecture

- **Framework:** Next.js 16+ with standalone mode (server-side Node.js, NOT static export)
- **Data store:** File-based JSON in `data/` directory (`provas.json`, `gallery.json`, `contact.json`, `logos.json`)
- **Admin console:** `/admin` — protected by `ADMIN_PASSWORD` env var (default: `admin123`)
- **Styling:** Tailwind CSS with custom theme colors
- **Docker:** `docker build -t olimpiada-astra . && docker run -d -p 3558:3000 -v /path/to/data:/app/data olimpiada-astra`

## Important: Next.js 16 Breaking Changes

This project uses Next.js 16+ which has breaking API changes. Params in server components are Promises that must be awaited. Always check `node_modules/next/dist/docs/` before writing code.

## Key Pages to Test

| Page | URL | What to verify |
|------|-----|----------------|
| Home | `/` | Logo in header, hero section with official background, no duplicate title |
| Provas | `/provas` | Three sections: Provas, Provas com Gabarito, Documentos |
| Galeria | `/galeria` | Gallery events with photo counts, lightbox viewer |
| Sobre | `/sobre` | Timeline, company info |
| Contato | `/contato` | Contact details, social links |
| Admin | `/admin` | Login with ADMIN_PASSWORD, CRUD for provas/gallery/contact/logos |

## Testing Content Changes

1. Check `data/provas.json` for expected item counts:
   - Items have `category` field: `prova`, `gabarito`, or `documento`
   - The provas page filters and displays each category in its own section
2. Verify PDF files exist in `public/pdf/` and return HTTP 200
3. Verify image files exist in `public/img/` (logos, background)
4. The seed script `scripts/seed-data.ts` should match `data/provas.json` for fresh installs

## Testing Identity/Branding Changes

- **Header logo:** `public/img/logo-olimpiada-horizontal.png` — horizontal layout with math symbols + text, used in `src/components/Header.tsx`
- **Hero logo:** `public/img/logo-olimpiada-branco.png` — white version for dark backgrounds, used in `src/app/(site)/page.tsx`
- **Background:** `public/img/fundo-olimpiada.jpg` — used via CSS class `.banner-bg` in `globals.css`
- **Brand color:** `#5ba3e6` (light blue) — used for math symbols, borders, accents
- **Favicon:** `src/app/favicon.ico`

## DOM Verification Tips

- Check for h1 elements: `curl -s http://localhost:3000 | grep -o '<h1[^>]*>[^<]*</h1>'`
- Check logo sources: `curl -s http://localhost:3000 | grep -o 'src="[^"]*logo[^"]*"'`
- Check favicon reference: `curl -s http://localhost:3000 | grep -o 'href="[^"]*favicon[^"]*"'`

## Browser Setup Notes

- Chrome might not be running by default. Start it with:
  ```bash
  /opt/.devin/chrome/chrome/linux-133.0.6943.126/chrome-linux64/chrome \
    --user-data-dir=/home/ubuntu/.browser_data_dir \
    --no-first-run --disable-session-crashed-bubble \
    --remote-debugging-port=29229 --display=:0 \
    http://localhost:3000 &>/dev/null &
  ```
- The wrapper script at `/home/ubuntu/.local/bin/google-chrome` only works when Chrome is already running (it opens tabs via CDP)
- If port 3000 is already in use, kill the old process or use the existing server
- `wmctrl` may need to be installed: `sudo apt-get install -y wmctrl`

## Devin Secrets Needed

No secrets required for local development and testing. The admin console uses `ADMIN_PASSWORD` env var (defaults to `admin123` for dev).
