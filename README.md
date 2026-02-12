# Personal Blog

Personal blog built with **Next.js 14**, **TinaCMS 2**, and **Tailwind CSS**.

🔗 [vfernandez.me](https://www.vfernandez.me)

## Requirements

- **Node.js** v24.x (see `.nvmrc`)

## Installation

```bash
npm install
```

## Scripts

| Command           | Description                                       |
|-------------------|---------------------------------------------------|
| `npm run dev`     | Development mode (TinaCMS + Next.js)              |
| `npm run build`   | Production build (requires TinaCloud config)      |
| `npm run buildSitemap` | Generates sitemap.xml from `content/page/home.json` |
| `npm run lint`    | Linter (standard)                                |
| `npm run type-check` | TypeScript verification                      |

## Content structure

Posts are edited in **TinaCMS** (`/admin`) and stored in:

- `content/page/home.json` — posts list and metadata

The sitemap is generated directly from this file with `npm run buildSitemap` (no Next.js build required).

## Tech stack

- Next.js 14
- React 18
- TinaCMS 2
- Tailwind CSS

## License

MIT

---

<p align="right"><a href="mailto:victor.fernandez.gayan@gmail.com">Contact</a></p>
