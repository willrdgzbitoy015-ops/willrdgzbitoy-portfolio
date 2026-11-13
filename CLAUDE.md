# Will R. Bitoy's portfolio

Full spec: `PROMPT-FOR-CLAUDE-CODE.md` (source of truth). Judging day: **2026-11-22**.

## Standing rules
1. **Only Will's listed facts.** Use only what the brief and `_brief/draft-2.html` say about him. Work history is job titles only, never an employer's name. Missing info becomes a `[placeholder]` and gets reported to Will.
2. **`_brief/`, `notes/` and `PROMPT-FOR-CLAUDE-CODE.md` are private.** Never delete or overwrite them; they stay in `.gitignore` (with `.obsidian/` and `graphify-out/`).
3. **Ask first** before creating a GitHub repo, pushing, deploying, creating any account, or adding a library not listed under Tech stack.
4. **Windows 11 + PowerShell.** Quote paths with spaces. Node v25.
5. **Explain as you go.** Will is a 3rd-year IT student and must be able to explain every feature. Readable code, short comments on the tricky parts.
6. **No templates or UI kits** (MUI, Chakra, shadcn/ui, Flowbite, Tailwind UI, DaisyUI, portfolio themes).
7. After each milestone: run the checks (build, lint, browser at 360/390/768/1024/1440, Lighthouse mobile 90+), update `notes/`, commit, and wait for Will's OK.

## Tech stack (final)
- React 19 + TypeScript + Vite with `@vitejs/plugin-react-swc`; Tailwind CSS v4 via `@tailwindcss/vite`; `src/styles/effects.css` for special effects.
- ESLint + Prettier (`prettier-plugin-tailwindcss`). Fonts self-hosted with `@fontsource` (Space Grotesk, Inter, JetBrains Mono). `sharp` is dev-only.
- Contact form: Web3Forms, key in `.env.local` as `VITE_WEB3FORMS_ACCESS_KEY`. Hosting: Vercel from a public GitHub repo (`willrdgzbitoy015-ops`).
- **No other runtime libraries:** no router, animation, i18n or icon library (icons are inline SVG in `src/components/ui/icons.tsx`).

## Design: the "Canvas" concept
- The site looks like a design-tool workspace: dotted canvas, selection boxes with square handles, ruler progress bar, layer-name tags (`Frame 01 · About`), status-bar footer. Match `_brief/draft-2.html`.
- **Colors are CSS variables** in `src/index.css` (Day "Lavender mist" on `:root`, Night "Ube night" on `:root[data-theme='dark']`), exposed to Tailwind with `@theme inline`. Use token classes (`bg-surface`, `text-ink`, `border-line`, `text-muted`, `bg-sel`...). **Never use `dark:` classes.**
- Gradients (`--grad`, `--tgrad`) are decoration only. Body text stays solid, WCAG AA.
- Motion: one orchestrated moment (hero drag-in), everything else subtle, never hide content behind an animation, fully respect `prefers-reduced-motion`.
- **All visible text and aria labels go through `t()`** with a key in `src/i18n/en.ts` and `src/i18n/ceb.ts`. Unsure Bisaya lines go in `_brief/bisaya-review.md`.
- A class like `hidden nav:inline-flex` on `<Button>` loses to the button's own `inline-flex`; use `max-nav:hidden` instead. `nav:` is the 880px navbar breakpoint.

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
