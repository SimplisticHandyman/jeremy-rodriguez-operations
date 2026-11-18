const { chromium } = require(process.env.PW_CORE || '/Users/agentops/SimplisticOS/node_modules/playwright-core');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + path.join(__dirname, 'og.html'));
  await p.screenshot({ path: '/tmp/jro-og.png' });
  await b.close();
})();
