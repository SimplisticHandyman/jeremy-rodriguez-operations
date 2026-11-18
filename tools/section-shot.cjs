// Usage: node tools/section-shot.cjs <url> <selector> <out-prefix>
// Crops one section (with a little context above/below) at 1440 and 390 wide.
const { chromium } = require(process.env.PW_CORE || '/Users/agentops/SimplisticOS/node_modules/playwright-core');
const [url, sel, prefix] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  for (const [w, mobile, dpr] of [[1440, false, 1], [390, true, 2]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('response', r => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.locator(sel).scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
    await p.addStyleTag({ content: '.top{position:static!important}.dock{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}' });
    const box = await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: 0, y: Math.max(0, r.top + scrollY - 24), width: innerWidth, height: r.height + 48 }; }, sel);
    await p.screenshot({ path: `${prefix}-${w}.png`, fullPage: true, clip: box });
    console.log(w, JSON.stringify({ height: Math.round(box.height), errs }));
    await ctx.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
