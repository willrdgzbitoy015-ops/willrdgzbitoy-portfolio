# Will R. Bitoy · Portfolio

My personal portfolio: a one-page site styled like a design-tool canvas, with a Day/Night theme and an English/Bisaya toggle.

## Tech

- React 19 + TypeScript + Vite (SWC)
- Tailwind CSS v4, plus one small CSS file for the canvas effects
- Self-hosted fonts: Space Grotesk, Inter, JetBrains Mono
- No UI kits, templates, router, animation library or icon library

## Run it

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check and build into dist/
npm run preview    # serve the built site locally
npm run lint       # ESLint
npm run format     # Prettier
```

The contact form needs a Web3Forms access key. Copy `.env.example` to `.env.local` and fill it in.

## Where things live

| Folder                     | What's inside                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `src/i18n/`                | `en.ts` (master text), `ceb.ts` (Bisaya, type-checked against English), the language context |
| `src/theme/`               | Day/Night theme context                                                                      |
| `src/data/`                | Links, sections and other content data                                                       |
| `src/hooks/`               | Scroll progress, in-view and active-section hooks                                            |
| `src/components/ui/`       | Small reusable pieces: Button, Logo, FrameTitle, Toast, icons                                |
| `src/components/sections/` | Navbar, MobileMenu, Hero, Footer and the page sections                                       |
| `src/styles/effects.css`   | Dotted canvas, ruler, selection boxes, keyframes                                             |
