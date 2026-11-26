# Will R. Bitoy · Portfolio

My personal portfolio: a dark navy, glass-and-glow design (with a light Day theme) and one page per project.

Built with plain **HTML, CSS and JavaScript**. No framework, no libraries, no build step.

## Run it

The quickest way: double-click `index.html`. Nothing needs to be installed to view or edit the site.

### With a local server (its own terminal)

In VS Code: **Terminal → New Terminal** (shortcut: Ctrl + Shift + the backtick key, left of 1), then:

```bash
npm run dev
```

Open **http://localhost:5173**. Leave that terminal open while you work; **Ctrl+C** stops it.
The server is `scripts/serve.mjs`: it only hands out the site's own files, never `_brief/`, `notes/` or `.git`.

### Share it with a public link (tunnel)

Keep `npm run dev` running. Open a **second** terminal (the **+** button, or the split button, in the terminal panel) and run:

```bash
npm run tunnel
```

ngrok prints a **Forwarding** line with an `https://…ngrok-free.dev` address. Send that link; it works on any phone or computer while both terminals stay open. Visitors first see an ngrok notice page and click **Visit Site** (free plan). **Ctrl+C** in each terminal stops the tunnel and the server.

## Where things live

| File or folder           | What's inside                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `index.html`             | The home page (Hero, About, Skills, Projects, Experience, Contact)                    |
| `project.html`           | One page for every project: `project.html?p=smartfine`, `?p=underground`, `?p=rubens` |
| `css/styles.css`         | All styles, in numbered sections (colors first)                                       |
| `css/fonts.css`          | The self-hosted fonts                                                                 |
| `js/core.js`             | Shared tools: helpers, toast, **bold** text, Day/Night theme                          |
| `js/layout.js`           | Preloader, mobile menu, resume buttons, navbar, fade-up on scroll, custom cursor      |
| `js/sections.js`         | Skill filter pills (home page)                                                        |
| `js/aura.js`             | The smoke aura around the hero photo (home page)                                      |
| `js/lightbox.js`         | The big preview for project screenshots                                               |
| `js/project-page.js`     | Builds a project page from `js/data/projects.js`                                      |
| `js/contact.js`          | Copy-email button and the contact form (checks, sending, success card)                |
| `js/data/projects.js`    | Everything each project page shows, words included                                    |
| `js/data/aura-points.js` | Points on the hero photo outline (made by `npm run aura`, don't edit by hand)         |
| `images/`, `fonts/`      | Photos and screenshots (WebP) and font files                                          |
| `scripts/`               | Helpers: the local server (`serve.mjs`), photo conversion, link-preview image         |

## Changing text

The site is in English. Home page text is written straight into `index.html`.

Project pages are built from `js/data/projects.js`, which holds each project's words too. Write `**bold**` for bold text and `[like this]` for something still to fill in (it shows highlighted).

The few messages JavaScript shows (form errors, "Email address copied.") are in the script that shows them, e.g. `js/contact.js`.

## Adding a project screenshot

Put it in `images/`, then in `js/data/projects.js` give that gallery slot a `src`, for example `{ src: 'images/smartfine-student.webp', caption: 'Student view' }`.

Certificates are private: the site has no Certificates section and never shows photos or scans of them.

## Optional tools

Only needed for running a local server, converting new photos or auto-formatting the code:

```bash
npm install
npm run dev        # local server at http://localhost:5173 (Ctrl+C to stop)
npm run tunnel     # public link to that server through ngrok (needs npm run dev running)
npm run images     # convert photos into the images/ folder
npm run og         # remake og-image.png, the link-preview picture
npm run aura       # after changing the hero photo: remake the smoke aura outline points
npm run format     # tidy CSS and JavaScript with Prettier
```
