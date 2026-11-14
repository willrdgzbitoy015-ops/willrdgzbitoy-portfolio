# Will R. Bitoy's portfolio

Full spec: `PROMPT-FOR-CLAUDE-CODE.md` (source of truth). Judging day: **2026-11-22**.

## Standing rules
1. **Only Will's listed facts.** Use only what the brief and `_brief/draft-2.html` say about him. Work history is job titles only, never an employer's name. Missing info becomes a `[placeholder]` and gets reported to Will. **Never put photos or scans of his certificates on the site** (confidential); the certificate cards use CSS-drawn art.
2. **`_brief/`, `notes/` and `PROMPT-FOR-CLAUDE-CODE.md` are private.** Never delete or overwrite them; they stay in `.gitignore` (with `.obsidian/` and `graphify-out/`).
3. **Ask first** before creating a GitHub repo, pushing, deploying, creating any account, or adding a library not listed under Tech stack.
4. **Windows 11 + PowerShell.** Quote paths with spaces. Node v25.
5. **Explain as you go.** Will is a 3rd-year IT student and must be able to explain every feature. Readable code, short comments on the tricky parts.
6. **No templates or UI kits** (MUI, Chakra, shadcn/ui, Flowbite, Tailwind UI, DaisyUI, portfolio themes).
7. After each milestone: run the checks (browser at 360/390/768/1024/1440 in both themes and both languages, no console messages, Lighthouse mobile 90+ once it is on a server), update `notes/`, commit, and wait for Will's OK.

## Scope changes that override the brief (Will, 2026-11-14)
- **Redesigned after a reference portfolio** (TikTok @dpi1n), every detail except the lanyard / hanging ID card. Spec: `_brief/reference-redesign.md`, frames in `_brief/reference/`. Copy structure and interactions only; all words, photos, projects and the logo stay Will's. The old "Canvas" look (dotted canvas, selection boxes, frame tags, ruler, status-bar footer, git-log timeline, role cards, skill level meters, project modal) is gone.
- **No SmartFine live demo** and no "Try SmartFine" link or button anywhere. The site only showcases work. Home page sections: Home, About, Skills, Projects, Experience, Certificates, Contact. Each project has its own page: `project.html?p=<id>`.
- **No Hemodialysis Scheduling System / capstone** anywhere on the site.
- Will graduated high school in **2024**.

- **Plain HTML, CSS and JavaScript.** Will asked to migrate away from React, TypeScript and Tailwind. Do not reintroduce a framework, TypeScript, Tailwind or a build step.

## Tech stack (Will's decision, 2026-11-14; overrides the brief's section 3)
- **Plain HTML + CSS + JavaScript, no build step, no runtime libraries.** The site must work when `index.html` is opened by double-click (`file://`), so: classic `<script defer>` files (no ES modules, no `import`), relative paths only (`images/x.webp`, never `/images/x.webp`), no font preloads.
- Files: `index.html` (home page markup, English text), `project.html` (one shell for every project; its navbar/footer/dialogs are copied from `index.html`, keep them in sync), `css/styles.css` (17 numbered sections), `css/fonts.css`, `js/core.js` (helpers, toast, language, theme), `js/layout.js` (preloader, menu, resume, navbar, fade-up reveal, custom cursor), `js/sections.js` (skill filter pills, certificate previews), `js/lightbox.js` (`WB.openLightbox(items, index)`), `js/project-page.js` (builds a project page from data), `js/contact.js` (copy email, form validation, Web3Forms; the key is the `WEB3FORMS_KEY` constant), `js/palette.js` (Ctrl+K), `js/data/projects.js` (project pages), `js/i18n/en.js` + `ceb.js`, `fonts/`, `images/`.
- Scripts share one global, `WB` (`WB.t`, `WB.$`, `WB.el`, `WB.toast`, `WB.onLangChange`...). Build DOM with `WB.el` / `textContent`, never `innerHTML` with text.
- Dev-only npm tools: `prettier` (`npm run format`; `index.html` is hand-formatted and ignored) and `sharp` (`npm run images`). Icons are inline SVG.
- Contact form: Web3Forms (milestone 3). Hosting: Vercel from a public GitHub repo (`willrdgzbitoy015-ops`), served as static files.

## Design: the reference look (2026-11-14, replaces the "Canvas" concept)
- Deep navy, a soft blue-violet glow behind sections, a violet primary button, the name in a blue → violet → cyan gradient, cyan secondary labels (role line, organisations, issuers), dark rounded cards with thin borders. Centered section headers: letter-spaced eyebrow, big bold H2, muted subtitle.
- Pieces: first-visit preloader ("Will." + progress line, once per visit via sessionStorage, CSS failsafe), floating glass pill navbar with a filled active pill, custom cursor dot + ring (fine mouse only), fade-up reveal (`.reveal`, only when `html.reveal-on`), skill filter pills, project cards → project pages (overview, challenges, lists, gallery + lightbox, next project), alternating Journey Timeline, certificate cards with a "Preview" lightbox, contact cards + form card, one-row footer.
- **Colors are CSS variables** in `css/styles.css` section 1 (Day on `:root`, Night on `:root[data-theme='dark']`). Night is the default unless the device asks for light. Always use the variables; never write a separate "dark" rule.
- Gradients (`--grad`) are decoration only. Body text stays solid, WCAG AA.
- Motion: subtle, never hide content without JS, fully respect `prefers-reduced-motion` (no preloader, cursor, reveal or floating then).
- **Every visible text and aria label is translatable.** In `index.html` write the English and add `data-i18n="key"` (text), `data-i18n-rich="key"` (text with `**bold**` / `[placeholder]`) or `data-i18n-attr="attr:key"`; add the Bisaya line to `js/i18n/ceb.js`. For a rich key, write real markup (`<strong>`) in the HTML **and** the `**bold**` version in `js/i18n/en.js`. English that JS builds, and any key a project page uses, goes in `js/i18n/en.js`. A missing Bisaya key shows a console warning, so keep the console clean. Will does not want a Bisaya review step: write the lines and move on, no review file, no asking.
- Test by opening `index.html` directly; the navbar breakpoint is 1100px (seven links).

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
