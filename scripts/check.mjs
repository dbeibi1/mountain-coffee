// Optional browser QA: requires Playwright and installed Chrome/Edge, not needed by the site.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.MOUNTAIN_COFFEE_PLAYWRIGHT || 'playwright');
const target = process.env.MOUNTAIN_COFFEE_URL || new URL('../index.html', import.meta.url).href;
const evidence = fileURLToPath(new URL('../evidence/', import.meta.url));
await mkdir(evidence, { recursive: true });
const results = { date: new Date().toISOString(), target, transport: target.startsWith('file:') ? 'Local files (offline); live HTTP hosting not verified' : 'HTTP', browsers: [], unavailableBrowsers: [], failures: [] };
const sizes = [
  ['mobile', 390, 844], ['tablet', 768, 1024], ['desktop', 1440, 900], ['narrow', 320, 800],
];

async function check(browser, channel, name, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  const requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('request', request => requests.push(request.url()));
  const checks = [];
  const pass = label => checks.push(label);
  try {
    await page.goto(target, { waitUntil: 'load' });
    await page.evaluate(async () => {
      await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode(); }));
    });
    assert.equal(await page.locator('h1').count(), 1);
    const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, broken: [...document.images].filter(i => !i.naturalWidth).length }));
    assert.ok(layout.scroll <= layout.width, `Horizontal overflow: ${layout.scroll} > ${layout.width}`);
    assert.equal(layout.broken, 0);
    pass('No horizontal overflow or broken images; one main heading');
    assert.equal(await page.locator('.coffee-card').count(), 4);
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1)))), true);
    pass('Four products and valid section-link targets');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    pass('Reduced-motion preference respected');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(e => document.activeElement === e), true);
    pass('Skip link is first keyboard focus');

    if (width <= 900) {
      const menu = page.getByRole('button', { name: 'Menu' });
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#navigation').isVisible(), true);
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      assert.equal(await menu.evaluate(e => document.activeElement === e), true);
      await menu.click();
      await page.locator('#navigation a[href="#our-story"]').click();
      assert.equal(await page.locator('#navigation').isVisible(), false);
      const top = await page.locator('#our-story').evaluate(e => e.getBoundingClientRect().top);
      const headerBottom = await page.locator('.site-header').evaluate(e => e.getBoundingClientRect().bottom);
      assert.ok(top >= headerBottom, 'Anchor target hidden by sticky header');
      pass('Mobile menu opens, closes, supports Escape/focus, and reveals unobscured section');
    } else {
      assert.equal(await page.locator('.menu-toggle').isVisible(), false);
      assert.equal(await page.locator('#navigation').isVisible(), true);
      pass('Desktop navigation visible');
    }

    const firstSummary = page.locator('summary').first();
    await firstSummary.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('details').first().getAttribute('open'), null);
    pass('FAQ toggles with keyboard');

    await page.locator('[data-coffee="Highland Origin"]').click();
    assert.equal(await page.locator('#interest').inputValue(), 'green');
    assert.match(await page.locator('#message').inputValue(), /Highland Origin/);
    await page.locator('#message').fill('My own example message');
    await page.locator('[data-coffee="Mountain Dawn"]').click();
    assert.equal(await page.locator('#interest').inputValue(), 'roasted');
    assert.equal(await page.locator('#message').inputValue(), 'My own example message');
    pass('Product links prefill type and preserve an edited message');

    const submit = page.getByRole('button', { name: 'Try sample request' });
    await submit.click();
    assert.equal(await page.locator('#sample-form').evaluate(f => f.checkValidity()), false);
    assert.equal(await page.locator('#form-status').textContent(), '');
    await page.locator('#contact-name').fill('   ');
    assert.equal(await page.locator('#contact-name').evaluate(e => e.validity.valid), false);
    await page.locator('#contact-name').fill('Alex Sample');
    await page.locator('#company').fill('Example Roasters');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#country').fill('Australia');
    await page.locator('#interest').selectOption('both');
    await submit.click();
    assert.equal(await page.locator('#form-status').textContent(), '');
    assert.equal(await page.locator('#email').evaluate(e => e.validity.valid), false);
    pass('Required fields, whitespace-only values, and invalid email are rejected');

    await page.locator('#email').fill('alex@example.com');
    const requestCount = requests.length;
    await submit.click();
    assert.equal(await page.locator('#form-status').textContent(), 'Demo request completed. No request has been sent.');
    assert.equal(await page.locator('#contact-name').inputValue(), '');
    assert.equal(requests.length, requestCount, 'Submit caused a request');
    assert.deepEqual(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })), { local: 0, session: 0 });
    assert.equal(await page.locator('#form-status').getAttribute('role'), 'status');
    pass('Valid form announces demo completion, resets entries, sends no request, and uses no browser storage');
    await page.locator('#contact-name').fill('New Example');
    assert.equal(await page.locator('#form-status').textContent(), '');
    await page.locator('#sample-form').evaluate(f => f.reset());
    pass('New input clears old confirmation');

    // Capture the unfilled final website at the requested viewport.
    await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
    if (name !== 'narrow') {
      await page.screenshot({ path: `${evidence}/${channel}-${name}.png` });
      if (channel === 'chrome') await page.screenshot({ path: `${evidence}/${channel}-${name}-full.png`, fullPage: true });
    }
    assert.deepEqual(errors, []);
    pass('No browser console or JavaScript errors');
    return { name, width, height, passed: true, checks };
  } finally { await context.close(); }
}

for (const channel of ['chrome', 'msedge']) {
  let browser;
  try {
    browser = await chromium.launch({ channel, headless: true });
    const entry = { channel, version: browser.version(), results: [] };
    results.browsers.push(entry);
    for (const [name, width, height] of sizes) {
      try { entry.results.push(await check(browser, channel, name, width, height)); console.log(`${channel}: ${name} passed`); }
      catch (error) { results.failures.push({ channel, viewport: name, error: error.message }); console.error(`${channel}: ${name}: ${error.message}`); }
    }
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await noJS.newPage();
      await page.goto(target);
      assert.equal(await page.locator('#navigation').isVisible(), true);
      assert.equal(await page.locator('#contact-name').isDisabled(), true, 'No-JavaScript form must be disabled');
      await page.locator('summary').first().click();
      assert.equal(await page.locator('details').first().getAttribute('open'), '');
      entry.noJavaScript = 'Passed: navigation readable, FAQ works, form remains safely disabled';
    } finally { await noJS.close(); }
  } catch (error) {
    const diagnostic = { channel, error: error.message.split('\nBrowser logs:')[0] };
    if (!browser) results.unavailableBrowsers.push(diagnostic);
    else results.failures.push(diagnostic);
  }
  finally { if (browser) await browser.close(); }
}
await writeFile(`${evidence}/test-results.json`, JSON.stringify(results, null, 2) + '\n');
console.log(`Saved evidence. Failed checks: ${results.failures.length}; unavailable browsers: ${results.unavailableBrowsers.length}`);
if (results.failures.length) process.exitCode = 1;
