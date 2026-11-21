# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary, until judging day (2026-11-22):** the judge, Will's friend in a just-for-fun Portfolio Battle. They score with a fixed rubric: first impression 10, design 20, content 15, responsiveness 15, required features 15, extra features 10, creativity 10, code and performance 5, plus bonuses for being deployed, a custom logo, a hard feature that works perfectly and a feature they can't figure out. Templates are banned. They will open the link on a phone and on a desktop, and they will poke at every feature.
- **After the battle (confirmed 2026-11-17):**
  - **Internships and jobs:** OJT coordinators, recruiters and employers. They read the projects, download the resume and get in touch.
  - **Local clients:** people and small businesses in Leyte who might hire Will to build a website or system, as Ruben's Photography did.
- Bisaya speakers are first-class visitors. Every visible line and every aria label can switch between English and Bisaya.

## Product Purpose

Will R. Bitoy's personal portfolio. He is a 3rd-year BS Information Technology student at Western Leyte College in Palompon, Leyte. The site **showcases** his work and does not run it (no live demos). Its job is to make a visitor believe that Will builds real, working systems for real people.

Success means:

1. Will wins the Portfolio Battle on 2026-11-22.
2. Every feature works on the live site, on a phone, in both themes and both languages.
3. After the battle, visitors download the resume or send a message about an internship, a job or a project.

## Positioning

**Paper to real systems** (confirmed 2026-11-17). Will takes routines that run on paper or by hand and turns them into working systems for real local users:

- **SmartFine:** school fines move from paper logbooks to a QR scan, an instant notice and payment through GCash.
- **Underground Apparel POS:** a clothing shop's sales, stock by color and size, suppliers and payroll.
- **Ruben's Photography:** a Palompon photographer's showcase site, where every "Book" button opens Messenger.

What another portfolio cannot honestly copy: these are real projects for real users in Palompon, Leyte; the whole site works in English and Bisaya; the photos are of Will himself. The current headline line, "I build systems that replace paper.", states this. Its final wording is still open.

## Operating Context

- The link will mostly travel through Messenger, so the link preview image matters.
- Visitors arrive on phones (360 and 390 px) and desktops. The site is checked at 360, 390, 768, 1024 and 1440 px.
- Pages: the home page (Home, About, Skills, Projects, Experience, Contact) and one project page per project (`project.html?p=<id>`).
- The site also has to work when Will opens `index.html` by double-click (`file://`). It will be hosted on Vercel from a public GitHub repo, but only once Will says so.
- Will must be able to explain every feature to his friend, so nothing on the site can be a black box to him.

## Capabilities and Constraints

**On the site now:** Day and Night themes (Night by default), the English/Bisaya toggle, a first-visit preloader, a custom cursor, skill filter pills, a page for each project with a gallery and lightbox, the Journey Timeline, a contact form (validation, honeypot, Web3Forms), copy email, the resume download, a Ctrl+K command palette, a console greeting and a link preview image.

**Technical (Will's decisions; details in `CLAUDE.md`):**

- Plain HTML, CSS and JavaScript. No build step, no runtime libraries, no framework, no TypeScript, no Tailwind.
- No templates or UI kits.
- Ask Will first before adding a library, creating a repo, pushing or deploying.

**Content rules:**

- Use only the facts Will has given. Anything missing becomes a visible `[placeholder]`, never a guess.
- Work history uses job titles only. Never name an employer.
- Never show photos or scans of Will's certificates, and never add a Certificates section.
- No SmartFine live demo and no "Try SmartFine" link or button.
- The Hemodialysis Scheduling System capstone does not appear anywhere.
- Will graduated from high school in 2024.

**Still undecided (the live list is in `notes/Open Questions.md`):**

- The final headline.
- The Interests list.
- Whether the Ctrl+K palette counts as the "hard feature".
- Whether the Journey Timeline keeps its certificate and honors text entries.
- The year of the Home Economics award.
- Whether the POS teammate can be named.
- The SmartFine Administrator's duties, and what the "10" means.
- The Ruben's Photography live link.
- Whether to show the second GitHub account.
- The Web3Forms key.
- Will's own drawing of the logo.

## Brand Commitments

- **Name:** Will R. Bitoy. The short mark is "Will." and it is the only brand in the navbar: the bird-shaped "W" logo was removed from the site on 2026-11-21 (Will's request). The browser-tab icon (`favicon.svg`) still uses that "W" for now.
- **Voice: playful and honest** (confirmed 2026-11-17). Friendly English with a few local Taglish jokes: "Anong gentle gentle?" (styled subtitle text, never the screenshot) and "debugging at 2 AM". Facts stay plain and accurate, with no hype and no made-up claims.
- **Photos:** only Will's own. The hero is the gloves photo; don't swap it unless Will asks.
- **Binding reference:** the structure and interactions follow a reference portfolio Will chose, except its lanyard / hanging ID card (see "Scope changes" in `CLAUDE.md`). Every word, photo, project and the logo are Will's own, so the site has to read as inspired by the reference, not a clone of it.

## Evidence on Hand

- **Project facts:** `js/data/projects.js`, with project text in `js/i18n/en.js` and `index.html`.
- **Real screenshots:** Ruben's Photography only (`images/rubens-*.webp`). SmartFine and the POS use drawn covers until Will sends screenshots made with dummy data.
- **Resume:** `will-bitoy-resume.pdf`. It is Will's own document and names employers; the site's own text still uses job titles only.
- **Photos:** the hero gloves cut-out (`images/hero-*.webp`) and the About sunset photo.
- **Link preview image:** `og-image.png`.
- **Public code:** the POS has a public repo. SmartFine has no public repo link yet.
- **Do not make these up:** testimonials or reviews of Will, client quotes, usage numbers or other metrics, live links that don't exist yet, certificate images, or employer names.

## Product Principles

1. **Real over impressive.** Every claim traces back to a fact Will gave. A gap becomes a visible placeholder, never a guess.
2. **It all works.** Quality and polish matter more than the number of features. A feature that is half-working costs more points than a missing one.
3. **Will can explain all of it.** Code stays readable, with comments on the tricky parts, and nothing he didn't choose gets added.
4. **Local and bilingual is the point.** Palompon, Leyte and the English/Bisaya toggle are part of who Will is, not decoration.
5. **Private by default.** Certificates, employers and anything Will calls confidential stay off the site.

## Accessibility & Inclusion

- Text meets WCAG AA contrast in both themes. Gradients are decoration only.
- The whole site works by keyboard, with visible focus styles.
- `prefers-reduced-motion` is fully respected: no preloader, custom cursor, reveal animation or floating then.
- Content is never hidden waiting for JavaScript or an animation.
- Every image and icon button has a label in both languages.
- No sideways scrolling at any width from 360 to 1440 px.
- Lighthouse mobile scores 90+ in every category once the site is on a server.
