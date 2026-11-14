# Will R. Bitoy · Portfolio

My personal portfolio: a one-page site styled like a design-tool canvas, with a Day/Night theme and an English/Bisaya toggle.

Built with plain **HTML, CSS and JavaScript**. No framework, no libraries, no build step.

## Run it

Double-click `index.html`, or in VS Code right-click it and choose **Open with Live Server**.

Nothing needs to be installed to view or edit the site.

## Where things live

| File or folder        | What's inside                                                            |
| --------------------- | ------------------------------------------------------------------------ |
| `index.html`          | The whole page, with the English text                                    |
| `css/styles.css`      | All styles, in numbered sections (colors, navbar, hero, sections, modal) |
| `css/fonts.css`       | The self-hosted fonts                                                    |
| `js/core.js`          | Shared tools: toast, English/Bisaya switch, Day/Night theme              |
| `js/layout.js`        | Mobile menu, resume buttons, ruler progress bar, active nav link         |
| `js/sections.js`      | Palompon clock, skill highlighting, project filter, details pop-up       |
| `js/data/projects.js` | What each project's details pop-up shows                                 |
| `js/i18n/en.js`       | English lines that JavaScript builds (the rest is in `index.html`)       |
| `js/i18n/ceb.js`      | Every Bisaya line                                                        |
| `images/`, `fonts/`   | Photos (WebP) and font files                                             |
| `scripts/`            | Optional helper to convert photos                                        |

## Changing text

1. Edit the English in `index.html`. Each translatable element has a `data-i18n="some.key"`.
2. Edit the same key in `js/i18n/ceb.js`.

If a key has no Bisaya line, the English stays and a warning appears in the browser console (F12).

## Optional tools

Only needed for converting new photos or auto-formatting the code:

```bash
npm install
npm run images     # convert photos into the images/ folder
npm run format     # tidy CSS and JavaScript with Prettier
```
