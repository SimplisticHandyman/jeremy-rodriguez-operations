# Portfolio Assessment and Redesign: jeremyrodriguezoperations.com

Date: 2026-11-18 (America/New_York). Machine: Jeremy's M1 (user `agentops`).
Source of truth for claims: `./resume/Jeremy_Rodriguez_Resume_LATEST.pdf`.

## 1. Hosting, repo, stack

| Item | Finding | Verified how |
|---|---|---|
| Live URL | https://jeremyrodriguezoperations.com (HTTP 200, `server: cloudflare`) | curl |
| Registrar / DNS | Namecheap, created 2026-08-16. Nameservers `dns1/dns2.registrar-servers.com` (Namecheap DNS). | whois, dig |
| Hosting (live) | **ChatGPT Sites.** `www` is a CNAME to `custom-domains.chatgpt.site`. Apex A records are `172.66.3.26` and `162.159.143.30` (Cloudflare edge in front of ChatGPT Sites). | dig |
| Live stack | "vinext" (Vite-based Next.js-style RSC runtime, rolldown chunks) plus a hand `script.js`/`styles.css` | page source |
| Deploy method (live) | Published from ChatGPT Sites. It can't be published from this machine. | inferred from DNS; not verifiable here |
| Local repo of the live site | **Not found on this M1.** Searched `~` for jeremy-operations / jeremyrodriguezoperations / portfolio names. `~/SimplisticCRM/app/portfolio` is the *Simplistic Handyman* project portfolio, not this site. `~/AgentWorksapce/projects/jeremy-os` is the private SDR ops app. The source may exist only inside ChatGPT Sites, or on the other Mac (unverified). | find/grep |
| **New site (this run)** | `./site/`: static HTML/CSS/vanilla JS, no framework, no webfonts, no build step | built here |
| New repo | `./` git repo, branch `redesign/2026-11-18`, **no remote** | git |
| Commits | `5ce8557` "Redesign portfolio as SDR/BDR-first static site" (plus the commit that adds this file; see `git log`) | git |

## 2. Screenshots
- Before (live): `./screenshots/before-1440.png`, `./screenshots/before-390.png`
- After (local `./site`): `./screenshots/after-1440.png`, `./screenshots/after-390.png`
- Above-the-fold crops: `./screenshots/after-1440-fold.png`, `./screenshots/after-390-fold.png`
- Screenshots are git-ignored (size). Regenerate with `node tools/screenshot.cjs <url> screenshots <prefix>`.

## 3. Before: what the live site says, and rule-break flags

The live site is positioned as an **Operations Manager** portfolio ("Open to remote operations roles"). That contradicts the SDR/BDR resume that links to it.

| # | Flag | Where on live site | Severity |
|---|---|---|---|
| 1 | **ChatGPT and Codex listed as tools** (resume: Claude Code, Claude only) | "Where I add value" skill list ("Microsoft Excel, Square, Codex & ChatGPT"); Simplistic case study "Tools: Proprietary CRM, Codex, ChatGPT" | High |
| 2 | **Hosted on ChatGPT Sites** (`custom-domains.chatgpt.site`). Not visible to most recruiters, but it conflicts with the Claude-only story. | DNS | Medium |
| 3 | **Blended hero stats with no labels:** "$54K first-year business revenue" and "5 subcontractors" (Simplistic) sit next to "20-30 service jobs per month" (a Sugar Hill number, relabeled "service jobs"). | Hero stat strip | High |
| 4 | Role positioning is Operations/Implementation, not SDR/BDR; "Target roles: Operations Management, Business Operations..." | Hero, About | High |
| 5 | **Ramydia Home Health Care** case study: not on the resume. Test metrics (5 synthetic events, 1 replay skipped, 0 changed pixels, 12 simultaneous attempts) can't be verified on this machine (the workspace lives on the other Mac). It also names a healthcare client publicly. | Case study 04 | High |
| 6 | **Organic Blends** case study: not on the resume. The work is real (local repo), but the site exposed internal details ("no Booksy scraping", "live SMS remains disabled", "fail-closed SMS controls"). "English / Spanish check-in" could read as Jeremy's language skill. | Case study 05 | Medium |
| 7 | Inflated summary: "10+ years of experience designing practical workflows" (resume: "10+ years in customer-facing retail and service"). | Hero | Medium |
| 8 | Claims not on the resume: "Weekly revenue and lead-source reconciliation", "Staff Training & Adoption" for Sugar Hill, "Validated records". | Case studies | Medium |
| 9 | Name mismatch: "Sugarhill Hardware" on the site vs "Sugar Hill Hardware" on the resume. | Throughout | Low |
| 10 | The $54K is labeled correctly as first-year business revenue (not a quota). There are no degree claims and no explicit bilingual claim. | n/a | OK |

**Sensitive data (before):** no secrets, keys, customer names or addresses found in the HTML or `script.js`. Email, phone, LinkedIn and Rutherford, NJ appear (expected; on the resume). The mockups used placeholder data ("Service request 101", "Walk-in 01"). The main exposure risk was naming Ramydia (a healthcare agency) and describing internal controls of client systems.

**Critique (before):** a clean editorial look and a good headshot, but the copy is generic consultant language ("I turn operational friction into systems people can actually use") that reads as AI-written. Case studies describe systems abstractly with div-built mock UIs, and Jeremy's actual selling work is nearly invisible. On mobile the page is about 16,000px long, with the CTA below the fold and step strips cut off. Weight is about 888KB, with a 767KB PNG headshot and a 1.8MB og.png, and the favicon 404s. Email and phone appear only in the footer.

Before grades: see `./rubric.md` (Overall D+).

## 4. What changed (after)

- **Positioning:** the hero now says "I run every sales conversation for my own business." Owner of Simplistic Handyman LLC and operations manager at Sugar Hill Hardware, "Now looking for a full-time SDR role." No claim of prior SDR/BDR employment.
- **Stats labeled by business** in two separate cards: Simplistic Handyman LLC (~$54K first-year business revenue; 5 subcontractors) and Sugar Hill Hardware (20-30 labor jobs per month supported; 5-person team supported).
- **"How I run a sale" walkthrough** (interactive, keyboard accessible): Research, Respond, Discover, Estimate, Follow up, Close & collect, from the resume's Simplistic bullets. The sample lead card is labeled "Demo data, not a real customer".
- **"What I did at each business"**, with filters (All / Selling / Operations / Systems I built) that hide non-matching bullets and announce the count to screen readers.
- **Background and tools:** a contractor-fluency card (HVAC/R studies plus running a home improvement business); selling skills from the resume; tools limited to Claude Code, Claude, Square, Microsoft Excel and Proprietary CRM; education with the exact no-degree wording; Languages: English.
- **Contact:** "Email Jeremy" in the header, hero, mobile dock (appears after the hero) and contact block. Copy-email button, tap-to-call, LinkedIn, and a resume PDF download (`/Jeremy_Rodriguez_Resume.pdf`, identical to the LATEST resume).
- **Removed:** Codex, ChatGPT, Ramydia, blended stats, operations-only targeting, internal SMS/Booksy details, and every em/en dash.
- **Performance:** about 48KB total over 5 requests. Headshot as AVIF/WebP/JPEG (9-37KB); OG image is a 40KB JPEG; favicon.svg + favicon.ico + apple-touch-icon; robots.txt, sitemap.xml, 404.html, and `_headers` (cache and security headers for Cloudflare Pages/Netlify).
- **Accessibility:** skip link, proper tab roles with arrow/Home/End keys, aria-pressed filters, aria-live status, visible focus rings, `prefers-reduced-motion` respected, works with JS off, and system light/dark mode.
- **Verification:** `tools/interactions.cjs` passes 12/12 checks (stepper click and keys, wrap-around, filters, counts, copy-email, dock show/hide, no overflow at 390, JS-off readability). The screenshot script reports zero console errors, zero failed requests, and zero dashes or banned terms in the visible text.

## 5. Per-business claims used on the new site, with sources

| Business | Claim on site | Source |
|---|---|---|
| Simplistic Handyman LLC | Owner & Operations Manager, New York, NY, Aug 2024 - Present | Resume |
| | Runs the full sales process by phone and email: inquiries, discovery, scope, price/estimate, follow-up on every estimate, close, collect payment | Resume |
| | Uses Claude to research customers/properties and draft quotes and follow-ups; checks facts and personalizes every message | Resume |
| | Approximately $54K first-year business revenue while establishing the operating model, pricing, workflow and subcontractor network | Resume |
| | Coordinates 5 subcontractors | Resume |
| | Designed an end-to-end operating system with Claude Code and Claude over about a month (intake, CRM, price guidance, estimates, scheduling, invoicing, collections, repeat clients, closeout); every open lead has a status and next step | Resume |
| Sugar Hill Hardware | Manager, Business Operations, Harlem, New York, NY, Oct 2020 - Present; earlier tenure Jan 2014 - Jun 2017 | Resume |
| | Works with homeowners, contractors, account customers in sales and business operations for a family-owned hardware and locksmith business | Resume |
| | Supports a 5-person team and 20-30 labor jobs per month (intake, scheduling, handoffs, billing follow-up, issue resolution) | Resume |
| | Payroll support, vendor documentation, financial records, charge accounts, collections | Resume |
| | Centralized CRM process replacing paper/spreadsheets; replacement POS and legacy inventory migration | Resume |
| Organic Blends Barbershop (side project, 2026, Rutherford, NJ) | Designed and built a mobile-first walk-in check-in (QR, barber or first available, services, place in line); owner and barber views; duplicate check-in protection; English/Spanish check-in screen described as a product feature | `~/Documents/Codex/2026-10-23/task-2/organic-blends-live/README.md`; git history shows commits authored "Jeremy Rodriguez" (2026-10-16). **Not on resume.** No volume, revenue or SMS claims made. Live status not verified, so the site does not claim it is live. |
| McCabe, Weisberg & Conway, LLC | Paralegal Assistant, New Rochelle, NY, Apr 2018 - Oct 2020; client/staff liaison; Excel and client systems for reporting and tracking; trained new staff | Resume |
| Education | HVAC/R Studies, TCI College of Technology, New York, NY, 2014-2016, GPA 3.8; coursework ended when the institution closed; no degree awarded | Resume |
| Ramydia Home Health Care | **Omitted.** Not on the resume, and its metrics can't be verified on this machine (the `ramydia` skill points to `/Users/jeremy/...` on the other Mac). | n/a |

Sample-lead text in the walkthrough ("Bathroom vanity replacement", "Follow up in 2 days") is illustrative and labeled as demo data. It is not a claim.

## 6. Remaining risks
1. **Organic Blends is not on the resume.** A careful recruiter could notice the mismatch. Options: add a one-line "Projects" entry to the resume, or delete the Organic Blends block from `site/index.html`. (This is why credibility is A-, not A.)
2. **Not deployed.** The live domain still serves the old ChatGPT Sites version, with Codex/ChatGPT, blended stats and Ramydia, until the deploy below happens. The resume links there today.
3. The Organic Blends repo lives under `~/Documents/Codex/...`. The site does not say which tools built it, which is intentional.
4. Speed was measured on a local server. Re-check on the real host (Lighthouse/PageSpeed) after deploy.
5. Commits were made locally with author "Jeremy Rodriguez <jeremyrod147@yahoo.com>" (the resume email). Change it before pushing if he prefers another identity.
6. The suggested GitHub home `SimplisticHandyman` is the Handyman business org. Jeremy keeps businesses separate, so a personal GitHub account may be the better home for a personal portfolio. His call.

## 7. Exact next steps to deploy (not done in this run)

**Blocker:** the custom domain is attached to ChatGPT Sites (`www` CNAME `custom-domains.chatgpt.site`), and this machine can't publish there or change DNS. ChatGPT Sites may keep claiming the domain until it is **disconnected inside ChatGPT Sites** (this happened before with organicblendsnj.com).

Recommended host: **Cloudflare Pages** (static, free, honors `site/_headers`). GitHub Pages also works (it ignores `_headers`).

1. **Create the repo (Jeremy):** a new private or public GitHub repo, e.g. `jeremyrodriguezoperations` under his chosen account/org. Then from this folder:
   ```bash
   git remote add origin git@github.com:<OWNER>/jeremyrodriguezoperations.git
   git push -u origin redesign/2026-11-18
   ```
   Open a PR into `main` (or push it as `main` for a fresh repo). No force-push is needed.
2. **Create the Pages project:** Cloudflare dashboard, then Workers & Pages, Create, Pages, Connect to Git, and pick the repo. Framework preset: None. Build command: *(empty)*. Output directory: `site`. Production branch: `main`. Confirm the `*.pages.dev` preview URL loads, then re-run:
   ```bash
   node tools/interactions.cjs https://<project>.pages.dev/
   node tools/screenshot.cjs https://<project>.pages.dev/ screenshots deployed
   ```
3. **Disconnect the domain from ChatGPT Sites (Jeremy, in ChatGPT):** remove `jeremyrodriguezoperations.com` and `www` from the old site's custom-domain settings. Keep the old site unpublished-but-intact until the new one is verified, if he wants a fallback.
4. **DNS at Namecheap (Jeremy):**
   - Simplest: in Cloudflare Pages, Custom domains, add `jeremyrodriguezoperations.com` and `www`. Cloudflare will ask to move nameservers to Cloudflare for the apex. Change the Namecheap nameservers to the two Cloudflare gives you, and Cloudflare creates the records.
   - Or keep Namecheap DNS: set `www` CNAME to `<project>.pages.dev`, and set the apex to redirect to `www` with Namecheap "URL Redirect Record" (301). Remove the old `custom-domains.chatgpt.site` CNAME and the old apex A records (`172.66.3.26`, `162.159.143.30`).
   - Check the current values in the Cloudflare Pages custom-domain screen at deploy time; it shows the exact records it expects.
5. **Verify live:** `curl -sI https://jeremyrodriguezoperations.com | grep -i server` should no longer point to ChatGPT Sites. `dig +short www.jeremyrodriguezoperations.com` should show the Pages target. Re-run the two tool scripts against the live URL and re-grade with the AFTER rubric.
6. **Optional:** submit the sitemap in Google Search Console, and update the LinkedIn "featured" link if it points anywhere else.

Do not touch any Render services (organic-blends, sugarhill-hardware-pos, jeremy-os-cloud, simplistic-handyman-crm) for this.

## 8. Preview pass (2026-11-18): Projects + resume preview

- **Site:** new `#projects` section (nav: "Projects") holds **Organic Blends Barbershop** (Live; walk-in check-in, live SMS queue updates, owner/barber views, duplicate check-in protection, English/Spanish check-in as a product feature) and **Ramydia Home Health Care** (Dry run, not in production; wording verbatim from `RAMYDIA_FACTS.md`). Paid roles remain in the experience section. Ramydia sources (not shown publicly): `/Users/jeremy/Documents/ChatGPT/Ramydia/README.md`, `docs/phase-2-status.md` (2026-08-15, production form generation stopped / not enabled), last commit `76e2443`, all as recorded in `RAMYDIA_FACTS.md`. I did not open these myself; they are on the other Mac.
- **Resume preview:** `preview/Resume_PREVIEW.pdf` (1 page) and `preview/Resume_PREVIEW.png`, built from copies `preview/build/common_preview.py` and `preview/build/build_preview.py` (system Python plus the ReportLab already in the user site-packages). The exact PROJECTS line is in `preview/PROJECTS_LINE.txt`. `resume/Jeremy_Rodriguez_Resume_LATEST.pdf` and `site/Jeremy_Rodriguez_Resume.pdf` are **unchanged**.
- **Screenshots:** `screenshots/preview-projects-1440.png`, `screenshots/preview-projects-390.png` (via `tools/section-shot.cjs`); `after-*.png` refreshed.
- **Pending Jeremy:** approve the resume preview, then replace the site's resume PDF; then deploy per section 7.
