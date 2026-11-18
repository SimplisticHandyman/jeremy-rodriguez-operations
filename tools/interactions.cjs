// Usage: node tools/interactions.cjs http://127.0.0.1:4173/
const { chromium } = require(process.env.PW_CORE || '/Users/agentops/SimplisticOS/node_modules/playwright-core');
const url = process.argv[2]; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) process.exitCode = 1; };
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await ctx.newPage(); await p.goto(url, { waitUntil: 'networkidle' });
  await p.click('#st-4'); ok((await p.textContent('[data-lead-status]')) === 'Estimate sent', 'stepper tab click updates sample lead');
  await p.focus('#st-4'); await p.keyboard.press('ArrowRight'); ok((await p.getAttribute('#st-5', 'aria-selected')) === 'true', 'arrow key moves to next step');
  ok((await p.$$eval('.lead-track li.on', l => l.length)) === 5, 'progress track shows 5 of 6');
  await p.click('[data-next]'); await p.click('[data-next]'); ok((await p.textContent('[data-step-title]')).startsWith('Research'), 'Start over wraps to step 1 after last step') ;
  await p.click('[data-filter="sell"]');
  const vis = await p.$$eval('.items li', l => l.filter(x => !x.hidden).length); const biz = await p.$$eval('[data-biz]', l => l.filter(x => !x.hidden).length);
  ok(vis === 3 && biz === 2, `Selling filter shows 3 items across 2 businesses (got ${vis}/${biz})`);
  ok((await p.textContent('[data-filter-status]')).includes('3 selling'), 'filter status announced');
  await p.click('[data-filter="all"]'); ok((await p.$$eval('.items li', l => l.filter(x => !x.hidden).length)) === 12, 'All restores 12 job items');
  ok((await p.$$eval('#projects .proj', l => l.length)) === 2 && (await p.$$eval('#projects [data-biz]', l => l.length)) === 0, 'Projects section holds 2 projects, separate from jobs');
  await p.click('[data-copy]'); await p.waitForTimeout(1000); const ct = await p.textContent('[data-copy]'); console.log('  copy label:', ct); ok(ct === 'Copied', 'copy email button gives feedback');
  await p.evaluate(() => scrollTo(0, 1600)); await p.waitForTimeout(600); ok(await p.$eval('[data-dock]', d => d.classList.contains('show')), 'mobile dock appears after hero');
  await p.evaluate(() => document.getElementById('contact').scrollIntoView()); await p.waitForTimeout(600); ok(!(await p.$eval('[data-dock]', d => d.classList.contains('show'))), 'dock hides at contact section');
  const sw = await p.evaluate(() => document.documentElement.scrollWidth); ok(sw === 390, 'no horizontal overflow at 390 (' + sw + ')');
  await ctx.close();
  const nj = await b.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } }); const q = await nj.newPage(); await q.goto(url);
  ok(await q.isVisible('text=What I did at each business.') && await q.isVisible('text=Paralegal Assistant'), 'content readable with JS off');
  await nj.close();
  for (const scheme of ['dark']) { const d = await b.newContext({ colorScheme: scheme, viewport: { width: 1440, height: 900 } }); const r = await d.newPage(); await r.goto(url, { waitUntil: 'networkidle' }); await r.screenshot({ path: '/tmp/jro-dark.png' }); await d.close(); }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
