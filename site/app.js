// Small progressive enhancements. Page is fully readable without JS.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sales process stepper. Copy mirrors the resume's Simplistic Handyman bullets.
  const STEPS = [
    { t: 'Research before the first touch', c: 'I use Claude to research each customer and property before I reach out. Then I check the facts myself, so nothing goes out on a guess.', s: 'Researching', n: 'Confirm property details' },
    { t: 'Respond to every inquiry', c: 'New inquiries come in by phone and email. I respond, introduce myself, and set up a conversation about the job.', s: 'New inquiry', n: 'Call back today' },
    { t: 'Discover the real need', c: 'I ask questions to understand what the customer needs and to clarify the scope before I put a price on anything.', s: 'Discovery', n: 'Confirm scope and photos' },
    { t: 'Price it and send the estimate', c: 'I price the work and send the estimate. Claude helps me draft the quote, and I check the numbers and personalize it before it goes out.', s: 'Estimate sent', n: 'Follow up in 2 days' },
    { t: 'Follow up on every estimate', c: 'I follow up on every estimate. My CRM keeps a clear status and next step on every open lead, so nothing goes quiet.', s: 'Following up', n: 'Answer questions, set a date' },
    { t: 'Close, then collect', c: 'I close the job, schedule the work, and collect payment. Then the job is closed out and repeat-client follow-up is tracked.', s: 'Won', n: 'Invoice and collect' },
  ];
  const stepper = document.querySelector('[data-stepper]');
  if (stepper) {
    const tabs = [...stepper.querySelectorAll('[role="tab"]')];
    const panel = stepper.querySelector('[role="tabpanel"]');
    const title = stepper.querySelector('[data-step-title]');
    const copy = stepper.querySelector('[data-step-copy]');
    const status = stepper.querySelector('[data-lead-status]');
    const next = stepper.querySelector('[data-lead-next]');
    const bars = [...stepper.querySelectorAll('.lead-track li')];
    const prevBtn = stepper.querySelector('[data-prev]');
    const nextBtn = stepper.querySelector('[data-next]');
    let cur = 0;
    const flash = (el) => { if (reduce) return; el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); };
    const go = (i, focus) => {
      cur = Math.max(0, Math.min(STEPS.length - 1, i));
      tabs.forEach((t, k) => { const on = k === cur; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', tabs[cur].id);
      const d = STEPS[cur];
      title.textContent = d.t; copy.textContent = d.c; status.textContent = d.s; next.textContent = d.n;
      bars.forEach((b, k) => b.classList.toggle('on', k <= cur));
      prevBtn.disabled = cur === 0;
      nextBtn.textContent = cur === STEPS.length - 1 ? 'Start over' : 'Next step';
      flash(title.parentElement); flash(status.closest('.lead-card'));
      if (focus) tabs[cur].focus();
    };
    tabs.forEach((t, k) => t.addEventListener('click', () => go(k)));
    stepper.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
      const m = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (m) { e.preventDefault(); go((cur + m + STEPS.length) % STEPS.length, true); }
      if (e.key === 'Home') { e.preventDefault(); go(0, true); }
      if (e.key === 'End') { e.preventDefault(); go(STEPS.length - 1, true); }
    });
    prevBtn.addEventListener('click', () => go(cur - 1));
    nextBtn.addEventListener('click', () => go(cur === STEPS.length - 1 ? 0 : cur + 1));
    bars[0].classList.add('on');
  }

  // Work filters
  const filterBtns = [...document.querySelectorAll('[data-filter]')];
  const items = [...document.querySelectorAll('.items li[data-tag]')];
  const bizes = [...document.querySelectorAll('[data-biz]')];
  const fStatus = document.querySelector('[data-filter-status]');
  const LABEL = { sell: 'selling', ops: 'operations', sys: 'systems' };
  filterBtns.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.filter;
    filterBtns.forEach((x) => x.setAttribute('aria-pressed', x === b));
    let shown = 0;
    items.forEach((li) => { const ok = f === 'all' || li.dataset.tag === f; li.hidden = !ok; if (ok) shown++; });
    let biz = 0;
    bizes.forEach((a) => { const any = [...a.querySelectorAll('li[data-tag]')].some((li) => !li.hidden); a.hidden = !any; if (any) biz++; });
    fStatus.textContent = f === 'all' ? '' : `Showing ${shown} ${LABEL[f]} items across ${biz} ${biz === 1 ? 'business' : 'businesses'}.`;
  }));

  // Copy email
  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    let done = false;
    try { await Promise.race([navigator.clipboard.writeText(b.dataset.copy), new Promise((_, r) => setTimeout(r, 800))]); done = true; } catch {}
    if (!done) {
      const t = document.createElement('textarea'); t.value = b.dataset.copy; t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;opacity:0;top:0;left:0'; document.body.appendChild(t); t.select();
      try { done = document.execCommand('copy'); } catch {}
      t.remove();
    }
    b.textContent = done ? 'Copied' : 'Use the email link';
    b.classList.add('done');
    setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 1800);
  }));

  if (!('IntersectionObserver' in window)) return;

  // Reveal sections as they enter
  const revealables = document.querySelectorAll('.proof-group, .step-body, .biz, .proj, .cell, .contact-grid');
  if (!reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach((el) => { el.setAttribute('data-reveal', ''); io.observe(el); });
  }

  // Mobile contact dock. Shown only when: the hero CTAs are off screen, the
  // contact section and footer are not on screen, and the user is scrolling up.
  // visualViewport keeps the bar pinned to the visible bottom on iOS Safari,
  // where position:fixed follows the layout viewport while the toolbar animates.
  const dock = document.querySelector('[data-dock]');
  const heroCta = document.querySelector('[data-hero-cta]');
  const contact = document.getElementById('contact');
  const foot = document.querySelector('.foot');
  if (dock && heroCta && contact) {
    let pastHero = false, atContact = false, atFoot = false, scrollingUp = false, zoomed = false;
    let shown = null;
    const sync = () => {
      const show = pastHero && !atContact && !atFoot && scrollingUp && !zoomed;
      if (show === shown) return;
      shown = show;
      dock.classList.toggle('show', show);
      dock.setAttribute('aria-hidden', String(!show));
      dock.querySelectorAll('a').forEach((a) => (a.tabIndex = show ? 0 : -1));
    };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(heroCta);
    new IntersectionObserver(([e]) => { atContact = e.isIntersecting; sync(); }).observe(contact);
    if (foot) new IntersectionObserver(([e]) => { atFoot = e.isIntersecting; sync(); }).observe(foot);

    // Scroll direction with a small threshold; ignore iOS rubber-band overscroll.
    const THRESHOLD = 24;
    let anchor = window.scrollY, lastY = window.scrollY, ticking = false;
    const onScroll = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y < 0 || y > max) return;
      if ((y > lastY && scrollingUp) || (y < lastY && !scrollingUp)) anchor = lastY;
      if (y - anchor > THRESHOLD) scrollingUp = false;
      else if (anchor - y > THRESHOLD) scrollingUp = true;
      lastY = y;
      sync();
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

    // Lift the bar by the gap between the layout and visual viewport bottoms.
    const vv = window.visualViewport;
    if (vv) {
      const place = () => {
        zoomed = vv.scale > 1.01;
        const lift = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) + 'px';
        if (lift !== dock.style.getPropertyValue('--dock-lift')) {
          // Track the toolbar instantly; only show/hide is animated.
          dock.style.transition = 'none';
          dock.style.setProperty('--dock-lift', lift);
          void dock.offsetHeight;
          dock.style.transition = '';
        }
        sync();
      };
      vv.addEventListener('resize', place);
      vv.addEventListener('scroll', place);
      place();
    }
  }
})();
