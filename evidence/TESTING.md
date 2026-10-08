# Browser and responsive testing evidence

**Test date:** 8 October 2026 at 20:37, Pacific/Port_Moresby (UTC+10).  
**Environment:** Windows; Google Chrome 154.0.8037.98; automated Playwright checks against local files.  
**Result:** All 4 tested viewports passed, with zero failed assertions or browser console/JavaScript errors.

## Responsive captures

| Layout | Viewport | Result | Screenshot |
| --- | --- | --- | --- |
| Mobile | 390 × 844 | Passed | [Mobile](chrome-mobile.png) |
| Tablet | 768 × 1024 | Passed | [Tablet](chrome-tablet.png) |
| Desktop | 1440 × 900 | Passed | [Desktop](chrome-desktop.png) |
| Narrow layout | 320 × 800 | Passed | Automated overflow and interaction checks |

Full-page captures: [mobile](chrome-mobile-full.png), [tablet](chrome-tablet-full.png), [desktop](chrome-desktop-full.png). Full-page heights vary with content; the configured viewport widths are unchanged. Screenshots are browser captures, not design mockups.

## Verified scenarios

- All images loaded; no horizontal overflow at any tested width.
- One main heading, four product cards, and valid in-page link targets.
- Skip link is the first keyboard target.
- Mobile menu opens and closes, reports its state, closes with Escape, restores focus, and does not cover the selected section.
- Desktop navigation is visible and the mobile toggle is hidden.
- FAQ panels open and close using Enter.
- Product links populate the coffee type and preserve a visitor-edited message.
- Empty required fields, whitespace-only text, and malformed email addresses fail validation.
- Valid form submission announces the exact demo message, clears entries, and causes no request or browser storage write.
- New input clears the previous success message.
- Reduced-motion preference changes smooth scrolling to automatic scrolling.
- With JavaScript disabled, navigation remains visible, FAQs work, and form controls remain disabled.
- Desktop, tablet, mobile, and full-page captures were visually reviewed for layout consistency.

See [test-results.json](test-results.json) for per-viewport assertions and the browser version.

## Coverage limits and remaining checks

- Microsoft Edge is installed but exits during automated launch in this execution sandbox, before the page loads. Two launch approaches failed; no Edge pass is claimed.
- Safari, Firefox, physical phones/tablets, and screen-reader software were not tested. Viewports were simulated on a desktop browser.
- A separate in-app browser successfully loaded the local HTTP preview on port 4174. The automated screenshots above were captured from local files.
- Public GitHub Pages publication and live-host verification are pending. Do not interpret local screenshots as proof of a published website.

## Reproduction

From the project root, use Node.js with Playwright and installed browsers, then run `node scripts/check.mjs`. The README explains the optional environment variables for a bundled Playwright package or an HTTP target.

No separate written assessment report is included; this file is the brief browser/responsive testing record requested by A3.
