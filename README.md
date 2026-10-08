# Mountain Coffee

A responsive landing page for an **imaginary Papua New Guinea coffee exporter**, created for **ISO229 A3 — Responsive HTML5 + CSS3 Website**.

**Author:** Desmond Beibi  
**GitHub username:** [dbeibi1](https://github.com/dbeibi1)  
**Submission deadline:** 9 October 2026, 4:06 PM, Pacific/Port_Moresby (UTC+10).

## Publication status

The public repository and GitHub Pages website were published and verified on 8 October 2026. Pages deploys from the `main` branch at `/(root)`.

- Repository: [dbeibi1/mountain-coffee](https://github.com/dbeibi1/mountain-coffee).
- Live website: [dbeibi1.github.io/mountain-coffee/](https://dbeibi1.github.io/mountain-coffee/).
- Live screenshots: [mobile](evidence/live-mobile.jpg), [tablet](evidence/live-tablet.jpg), [desktop](evidence/live-desktop.jpg).


## Purpose and audience

Mountain Coffee introduces a fictional brand to overseas importers, wholesalers, roasters, retailers, and hospitality buyers. Visitors can explore green and roasted concept coffees, learn about the proposed sourcing and export approach, and try a sample-request form.

This is a student demonstration, **not an operating exporter or online store**. The products, flavour profiles, packaging, and sourcing scenarios are illustrative. There are no verified lots, certifications, supplier relationships, prices, orders, or shipments.

## Features

- Responsive, single-page layout with original mountain-and-coffee branding.
- Premium forest-green, cream, brown, and gold palette, with locally available system fonts.
- Hero, company story, original Highlands illustration, four concept coffees, sourcing principles, export process, FAQs, sample form, and footer.
- Two green coffees: Highland Origin and Valley Reserve.
- Two roasted coffees: Mountain Dawn and Highland Dusk.
- Mobile navigation with `aria-expanded`, Escape-key support, and focus restoration.
- Native keyboard-accessible FAQ disclosures.
- Product links that preselect a coffee type and suggest a message without overwriting a visitor's edited message.
- Required-field, email, and whitespace validation; accessible demo confirmation.
- Skip link, visible keyboard focus, semantic landmarks, descriptive image alternatives, and reduced-motion support.
- Locally stored imagery and SVG artwork: no CDN, analytics, cookies, tracking scripts, or external font requests.

## Technologies

HTML5, CSS3 (Grid, Flexbox, custom properties, media queries), and vanilla JavaScript. **No framework, package installation, backend, database, or build step is required to use the website.** Optional preview and QA scripts use Node.js; automated browser QA additionally uses Playwright with installed Chrome and Edge.

## Run locally

The simplest option is to open `index.html` in Chrome or Edge. All links and assets use relative paths.

For an HTTP preview, install Node.js if it is not already available, open a terminal in this folder, and run:

```sh
node scripts/serve.mjs
```

Open the printed local URL (normally `http://127.0.0.1:4173`). Stop the preview with Ctrl+C. The preview serves only the website's HTML, CSS, JavaScript, and assets; it does not expose the supplied assignment PDF.

The optional `PORT` environment variable selects a different port. The preview also accepts `/mountain-coffee/` to check GitHub Pages project-relative paths.

## Form behaviour and privacy

Required fields: contact name, company, email, destination country, and interest in green, roasted, or both types of coffee. Quantity and message are optional.

Use fictitious example details. A valid submission displays exactly:

> Demo request completed. No request has been sent.

Submission is prevented in JavaScript. Entries are then cleared; nothing is emailed, transmitted by the application, or saved in browser storage. The form has no backend. Without JavaScript, its fieldset remains disabled. Inputs intentionally omit `name` attributes as an additional safeguard against accidental native submission of entered data.

Hosting providers may separately log website visits; this project's form does not send the entered values to them.

## Responsive and browser evidence

See [the testing record](evidence/TESTING.md) and [machine-readable results](evidence/test-results.json) for the actual test scope and outcomes.

| Required size | Viewport | Chrome screenshot |
| --- | --- | --- |
| Mobile | 390 × 844 | [Mobile](evidence/chrome-mobile.png) |
| Tablet | 768 × 1024 | [Tablet](evidence/chrome-tablet.png) |
| Desktop | 1440 × 900 | [Desktop](evidence/chrome-desktop.png) |

Microsoft Edge is installed, but its automated process exited before loading the page in the execution sandbox. No Edge pass or screenshot is claimed. Safari, Firefox, and physical devices have not been verified. The published website was checked separately in the in-app browser; see the testing record for its scope.

Full-page Chrome captures are also included: [mobile](evidence/chrome-mobile-full.png), [tablet](evidence/chrome-tablet-full.png), and [desktop](evidence/chrome-desktop-full.png). These show the complete page at each viewport width, so their image heights exceed the viewport heights. An additional 320-pixel-wide layout is tested for overflow.

### Repeat automated checks (optional)

With Node.js, Chrome, and Microsoft Edge installed:

```sh
npm install --no-save --package-lock=false playwright
node scripts/check.mjs
```

The script defaults to the local `index.html`. Set `MOUNTAIN_COFFEE_URL` to an HTTP preview or the published URL to test that address. If Playwright is supplied by a bundled runtime, `MOUNTAIN_COFFEE_PLAYWRIGHT` can point to that runtime's Playwright package. A nonzero exit indicates a failed check; inspect `evidence/test-results.json`.

## Image and artwork credits

All photographs are locally stored and used under the [Pexels License](https://www.pexels.com/license/). No endorsement by the photographers or depicted person is implied.

| Local asset | Creator and source | Use |
| --- | --- | --- |
| `assets/coffee-cherries.jpg` | Rafael Y., [Vibrant Coffee Cherries on Branch Outdoors](https://www.pexels.com/photo/vibrant-coffee-cherries-on-branch-outdoors-36776700/) | Hero; representative coffee imagery, not verified PNG photography |
| `assets/coffee-harvest.jpg` | Michael Burrows, [A Man Harvesting Coffee Fruits from the Shrub](https://www.pexels.com/photo/a-man-harvesting-coffee-fruits-from-the-shrub-7125687/) | Sourcing section; not a Mountain Coffee farm or supplier |
| `assets/roasted-coffee.jpg` | Thirdman, [Coffee Beans in Ceramic Bowl on Wooden Table Top](https://www.pexels.com/photo/coffee-beans-in-ceramic-bowl-on-wooden-table-top-8936822/) | Sample section; representative roasted coffee |

Logo, favicon, stylised Highlands illustration, and four packaging illustrations are original SVG artwork created for this project. The landscape is an illustration, not a map or a photograph of a named location. Packaging artwork can be regenerated with `node scripts/create-packaging.mjs`; generated assets are already included.

## Submission checklist

- Website source and local assets: included.
- Updated README: included.
- Mobile, tablet, and desktop screenshots: see the evidence folder.
- Browser and responsive testing: see the testing record and JSON results.
- Public GitHub repository URL: included above.
- Verified live website URL and live-host checks: completed; see the testing record.
- Separate written report: not required by the supplied A3 brief.

Keep the original assignment PDF out of GitHub. It is excluded by `.gitignore` and by the prepared upload package. Do not publish credentials, local caches, or personal form data.
