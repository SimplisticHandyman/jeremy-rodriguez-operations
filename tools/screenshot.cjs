// Usage: node tools/screenshot.cjs <url> <out-dir> <prefix>   e.g. http://127.0.0.1:4173 screenshots after
// Takes full-page shots at 1440 and 390 (1x, avoids Chrome's tall-capture tiling) and prints basic metrics.
const { chromium } = require(process.env.PW_CORE || '/Users/agentops/SimplisticOS/node_modules/playwright-core');
const [url, out, prefix] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, colorScheme: process.env.SCHEME || 'light' });
    const p = await ctx.newPage(); const errs = [];
    p.on('console', m => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', e => errs.push(String(e)));
    p.on('response', r => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
    await p.goto(url, { waitUntil: 'networkidle' });
    const fold = await p.evaluate(() => { const c = document.querySelector('[data-hero-cta]').getBoundingClientRect(); return { ctaBottom: Math.round(c.bottom), vh: innerHeight }; });
    await p.screenshot({ path: `${out}/${prefix}-${w}-fold.png` });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 300) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(60); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(700);
    const m = await p.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0]; const res = performance.getEntriesByType('resource');
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      const over = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && !e.closest('.dock'); }).map(e => e.tagName + '.' + e.className).slice(0, 6);
      const small = [...document.querySelectorAll('a,button')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 40 && getComputedStyle(e).position !== 'absolute'; }).map(e => e.textContent.trim().slice(0, 20));
      const txt = document.body.innerText;
      return { height: document.documentElement.scrollHeight, scrollW: document.documentElement.scrollWidth, fcp: fcp && Math.round(fcp.startTime), load: Math.round(nav.loadEventEnd), reqs: res.length + 1, KB: Math.round((res.reduce((a, r) => a + (r.transferSize || r.encodedBodySize || 0), 0) + (nav.transferSize || nav.encodedBodySize)) / 1024), overflow: over, smallTargets: small, dashes: (txt.match(/[–—]/g) || []).length, banned: (txt.match(/chatgpt|codex|bilingual|quota|degree in|ramydia/gi) || []) };
    });
    console.log(prefix, w, JSON.stringify({ ...fold, ...m, errs }));
    // The fixed mobile dock only appears mid-scroll; hide it for the static full-page capture so it does not cover content.
    await p.addStyleTag({ content: '.dock{display:none!important}' });
    await p.screenshot({ path: `${out}/${prefix}-${w}.png`, fullPage: true });
    await ctx.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
