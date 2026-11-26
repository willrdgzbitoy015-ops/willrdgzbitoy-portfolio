# Will R. Bitoy's portfolio

Full spec: `PROMPT-FOR-CLAUDE-CODE.md` (source of truth). Judging day: **2026-11-22**.

## Standing rules
1. **Only Will's listed facts.** Use only what the brief and `_brief/draft-2.html` say about him. Work history is job titles only, never an employer's name. Missing info becomes a `[placeholder]` and gets reported to Will. **Never put photos or scans of his certificates on the site** (confidential), and there is no Certificates section at all.
2. **`_brief/`, `notes/` and `PROMPT-FOR-CLAUDE-CODE.md` are private.** Never delete or overwrite them; they stay in `.gitignore` (with `.obsidian/` and `graphify-out/`).
3. **Ask first** before creating a GitHub repo, pushing, deploying, creating any account, or adding a library not listed under Tech stack.
4. **Windows 11 + PowerShell.** Quote paths with spaces. Node v25.
5. **Explain as you go.** Will is a 3rd-year IT student and must be able to explain every feature. Readable code, short comments on the tricky parts.
6. **No templates or UI kits** (MUI, Chakra, shadcn/ui, Flowbite, Tailwind UI, DaisyUI, portfolio themes).
7. After each milestone: run the checks (browser at 360/390/768/1024/1440 in both themes, no console messages, Lighthouse mobile 90+ once it is on a server), update `notes/`, commit, and wait for Will's OK.

## Scope changes that override the brief (Will, 2026-11-14)
- **Redesigned after a reference portfolio** (TikTok @dpi1n), every detail except the lanyard / hanging ID card. Spec: `_brief/reference-redesign.md`, frames in `_brief/reference/`. Copy structure and interactions only; all words, photos, projects and the logo stay Will's. The old "Canvas" look (dotted canvas, selection boxes, frame tags, ruler, status-bar footer, git-log timeline, role cards, skill level meters, project modal) is gone.
- **No SmartFine live demo** and no "Try SmartFine" link or button anywhere. The site only showcases work. Home page sections: Home, About, Skills, Projects, Experience, Contact. **No Certificates section** (Will, 2026-11-15: confidential). Each project has its own page: `project.html?p=<id>`.
- **No Hemodialysis Scheduling System / capstone** anywhere on the site.
- Will graduated high school in **2024**.
- **English only, no search (Will, 2026-11-26).** The English/Bisaya toggle and the Ctrl+K command palette are removed. Don't bring back a language switch, `data-i18n` keys, dictionaries or a palette. Local touches stay as plain text: "wala nang papel-papel" (no more paperwork) in About and the footer's "Salamat sa pagbisita!" (shown with its English).
- **Hero shows the course, not "student" (Will, 2026-11-26):** the role line is "BS Information Technology · Web and Mobile Developer" (stacked on phones) and the hero text doesn't mention being a student or the school. Elsewhere (About, Timeline, page title, link preview) the student facts stay.
- **Skills show the most relevant ones only (Will, 2026-11-26):** no System analysis, bcrypt, AES-256-GCM, Email OTP, Role-based access or Audit log trail cards and no Security filter (those stay on the SmartFine page), and no PayMongo (GCash) card. Skills has two blocks: **Core stack** (6 big cards: React Native, JavaScript, PHP, SQLite, HTML and CSS, TypeScript, each with one factual line and "Used in" project links) and **More tools and skills** (the rest, filters All / Code / Tools / Creative / Beyond code; the filter never touches the core cards). Interests: no "Driving and Motorbikes".
- **About (Will, 2026-11-26):** no "Why IT?" box and no "Anong gentle gentle?" pill or "Ilalabas ko na ang aking app." line; don't add them back. No "Currently" card (Will said no).
- Contact topics: A project idea, Question about technologies, Just saying hi. **No "Job or internship" topic** (Will, 2026-11-26).

- **Plain HTML, CSS and JavaScript.** Will asked to migrate away from React, TypeScript and Tailwind. Do not reintroduce a framework, TypeScript, Tailwind or a build step.

## Tech stack (Will's decision, 2026-11-14; overrides the brief's section 3)
- **Plain HTML + CSS + JavaScript, no build step, no runtime libraries.** The site must work when `index.html` is opened by double-click (`file://`), so: classic `<script defer>` files (no ES modules, no `import`), relative paths only (`images/x.webp`, never `/images/x.webp`), no font preloads.
- Files: `index.html` (home page markup, English text), `project.html` (one shell for every project; its navbar/footer/dialogs are copied from `index.html`, keep them in sync), `css/styles.css` (17 numbered sections), `css/fonts.css`, `js/core.js` (helpers, toast, rich text, theme), `js/layout.js` (preloader, menu, resume, navbar, fade-up reveal, custom cursor), `js/sections.js` (skill filter pills), `js/lightbox.js` (`WB.openLightbox(items, index)`), `js/project-page.js` (builds a project page from data), `js/contact.js` (copy email, form validation, Web3Forms; the key is the `WEB3FORMS_KEY` constant), `js/aura.js` (smoke aura canvas behind the hero photo), `js/data/projects.js` (project pages: structure and words), `js/data/aura-points.js` (hero outline points, generated by `npm run aura`, never edit by hand), `fonts/`, `images/` (`images/logos/` = official skill logos).
- Scripts share one global, `WB` (`WB.$`, `WB.$$`, `WB.el`, `WB.toast`, `WB.rich`, `WB.openLightbox`, `WB.watchReveal`...). Build DOM with `WB.el` / `textContent`, never `innerHTML` with text.
- **Local server: `npm run dev` = `scripts/serve.mjs`** (plain Node, no library): serves only `index.html`, `project.html`, `favicon.svg`, `og-image.png`, `robots.txt`, the resume PDF and `css/ js/ fonts/ images/`; everything else is 404, no folder listings; refuses to start if the port already answers. **Never use `python -m http.server`** for this project: it serves `_brief/`, `notes/` and `.git` (Will, 2026-11-26). **`npm run tunnel` = `ngrok http 127.0.0.1:5173`** (Will's ngrok account, token already set up); a tunnel publishes the site, so only start one when Will asks, and stop it afterwards.
- Dev-only npm tools: `prettier` (`npm run format`; `index.html` is hand-formatted and ignored) and `sharp` (`npm run images`, and `npm run aura` after changing the hero photo). Icons are inline SVG (duotone sprite); skill logos are SVG files in `images/logos/`.
- Contact form: Web3Forms (milestone 3). Hosting: Vercel from a public GitHub repo (`willrdgzbitoy015-ops`), served as static files.

## Design: the reference look (2026-11-14, replaces the "Canvas" concept)
- Deep navy, a soft blue-violet glow behind sections, a violet primary button, the name in a blue → violet → cyan gradient, cyan secondary labels (role line, organisations, issuers), dark rounded cards with thin borders. Centered section headers: big bold H2 and a muted subtitle (the letter-spaced eyebrow labels were removed 2026-11-17; don't add them back). Shadows are neutral (black at low opacity), never a colored glow.
- Pieces: preloader on the first page of a visit **and on every refresh (F5)** (letters of "Will." rise, the bar and number follow real progress, then a curtain with a gradient edge slides up; CSS failsafe at 3 s), followed by the hero entrance (`html.intro`; on a normal page change only the quick entrance runs), floating glass pill navbar with a filled active pill, custom cursor dot + ring (fine mouse only), fade-up reveal (`.reveal`, only when `html.reveal-on`), skill filter pills, project cards → project pages (overview, challenges, lists, gallery + lightbox, next project), alternating Journey Timeline, contact cards + form card (topic as radio chips), footer (brand + section links + socials, then a bottom bar with copyright, the thank-you and back to top). Tab icon: `favicon.svg` = "W." in the wordmark style (drawn shapes, not text).
- **Colors are CSS variables** in `css/styles.css` section 1 (Day on `:root`, Night on `:root[data-theme='dark']`). Night is the default unless the device asks for light. Always use the variables; never write a separate "dark" rule.
- Gradients (`--grad`) are decoration only. Body text stays solid, WCAG AA.
- Smoke aura in the hero: `js/aura.js` draws soft theme-colored puffs on a canvas behind the photo, born at outline points from `js/data/aura-points.js`. It pauses off-screen and in hidden tabs.
- Motion: subtle, never hide content without JS, fully respect `prefers-reduced-motion` (no preloader, no entrance, cursor, reveal, floating, smoke aura or circular theme switch then).
- **Text is English, written where it shows.** Home page text goes straight into `index.html` (real `<strong>` for bold). A project page's words live in its entry in `js/data/projects.js` (`**bold**` and `[placeholder]` are styled by `WB.rich`). Messages that JS shows sit in the script that shows them. Every icon button still needs an `aria-label`.
- Test by opening `index.html` directly; the navbar breakpoint is 1100px (six links).
- **Cache version:** every CSS and JS link in `index.html` and `project.html` ends in `?v=<date><letter>`. After changing any CSS or JS, bump it in both files (same value everywhere), or Will's browser keeps showing the old files.

## Project memory (read every session)
- **Session start:** read `notes/00 Home.md`, `notes/Progress Log.md` and `notes/Open Questions.md`. They're an Obsidian vault with the decisions, progress and what's waiting on Will.
- **When Will decides something:** add it to `notes/Decisions.md` with the date.
- **After each milestone and before ending a session:** add an entry at the top of `notes/Progress Log.md` and update `notes/Open Questions.md`.
- Never write API keys, passwords or private data in `notes/`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

**On this PC the `graphify` command is not on PATH. Always run it as `python -m graphify …`** (Graphify 0.9.97, installed for C:\Python310).

Rules:
- When graphify-out/graph.json exists, run `python -m graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `python -m graphify path "<A>" "<B>"` for relationships and `python -m graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `python -m graphify update .` to keep the graph current (AST-only, no API cost).
- Never include `node_modules/`, `dist/` or `_brief/photos/` in the graph.
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
