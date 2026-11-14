# Will R. Bitoy · Portfolio

My personal portfolio: a dark navy, glass-and-glow design (with a light Day theme), an English/Bisaya toggle, a Ctrl+K command palette and one page per project.

Built with plain **HTML, CSS and JavaScript**. No framework, no libraries, no build step.

## Run it

Double-click `index.html`, or in VS Code right-click it and choose **Open with Live Server**.

Nothing needs to be installed to view or edit the site.

## Where things live

| File or folder        | What's inside                                                                         |
| --------------------- | ------------------------------------------------------------------------------------- |
| `index.html`          | The home page (Hero, About, Skills, Projects, Experience, Certificates, Contact)      |
| `project.html`        | One page for every project: `project.html?p=smartfine`, `?p=underground`, `?p=rubens` |
| `css/styles.css`      | All styles, in numbered sections (colors first)                                       |
| `css/fonts.css`       | The self-hosted fonts                                                                 |
| `js/core.js`          | Shared tools: toast, English/Bisaya switch, Day/Night theme                           |
| `js/layout.js`        | Preloader, mobile menu, resume buttons, navbar, fade-up on scroll, custom cursor      |
| `js/sections.js`      | Skill filter pills and certificate previews (home page)                               |
| `js/lightbox.js`      | The big preview for certificates and screenshots                                      |
| `js/project-page.js`  | Builds a project page from `js/data/projects.js`                                      |
| `js/contact.js`       | Copy-email button and the contact form (checks, sending, success card)                |
| `js/palette.js`       | The Ctrl+K command palette                                                            |
| `js/data/projects.js` | Everything each project page shows                                                    |
| `js/i18n/en.js`       | English lines that JavaScript builds (the rest is in `index.html`)                    |
| `js/i18n/ceb.js`      | Every Bisaya line                                                                     |
| `images/`, `fonts/`   | Photos and screenshots (WebP) and font files                                          |
| `scripts/`            | Optional helper to convert photos                                                     |

## Changing text

1. Edit the English in `index.html`. Each translatable element has a `data-i18n="some.key"`.
2. Edit the same key in `js/i18n/ceb.js`.

Project pages are built from `js/data/projects.js`; their words are in `js/i18n/en.js` and `js/i18n/ceb.js`.

If a key has no Bisaya line, the English stays and a warning appears in the browser console (F12).

## Adding a project screenshot

Put it in `images/`, then in `js/data/projects.js` give that gallery slot a `src`, for example `{ src: 'images/smartfine-student.webp', captionKey: 'gal.sf1' }`.

Certificates never get photos or scans: they stay private. The cards use certificate art drawn with CSS.

## Optional tools

Only needed for converting new photos or auto-formatting the code:

```bash
npm install
npm run images     # convert photos into the images/ folder
npm run format     # tidy CSS and JavaScript with Prettier
```
