# Recruiter Rubric: jeremyrodriguezoperations.com (BEFORE)

**This is the before grade**, taken 2026-11-18 (America/New_York) against the live site as it stands today. The same rubric and the same categories will be used to grade the site after the redesign.

**Point of view:** an SDR/BDR hiring manager who just clicked the portfolio link on Jeremy's resume (headline: "Outbound Prospecting | Contractor Outreach | Financing Conversations").

| Category | Grade | One-line reason |
|---|---|---|
| **Overall recruitability (SDR/BDR)** | **D+** | It looks polished, but it pitches an Operations Manager looking for "remote operations roles", which contradicts the SDR resume that links to it, and it lists Codex/ChatGPT where the resume says Claude Code/Claude. |
| Credibility / trustworthiness | D | Codex and ChatGPT are listed twice (the resume says Claude Code, Claude), the hero stats mix Simplistic and Sugar Hill numbers with no labels, two case studies (Ramydia, Organic Blends) aren't on the resume, and their test metrics can't be verified. |
| First-impression design | B- | Clean editorial serif and a strong headshot, but the "I turn operational friction into systems…" headline is abstract and could belong to any consultant template. |
| Clarity of what he did at each business | C | Case studies describe systems in abstract terms ("one operational source of truth") with placeholder mockups. Jeremy's sales work (calls, estimates, follow-up, closing) is almost invisible. |
| Mobile (390px) | C+ | No page-level horizontal scroll and the text is readable, but the page is about 16,000px tall (~19 screens), the main CTA sits below the fold, step strips are cut off sideways, and two sticky bars take up about 100px. |
| Speed | B | The HTML arrives in about 0.3s and first paint is about 0.3–1.1s, but there is a 767KB PNG headshot, a 1.8MB og.png, and a 404 favicon. |
| Call to action / contact | C | Email and phone only appear in the footer. The top CTAs are "View selected work" and "LinkedIn", there is no resume download, and the stated target roles are Operations, not SDR/BDR. |

## Scoring notes
- Grades are relative to what an SDR/BDR hiring manager screens for: honest and consistent claims, evidence of selling activity (outreach, discovery, follow-up, closing), coachability and tool fluency, and how easy it is to contact him.
- Speed numbers come from headless Chrome on this M1 (Playwright, 2026-11-18), not a Lighthouse lab run. Treat them as directional.
- The things that cost the most today are the Codex/ChatGPT tool listing, the operations-role positioning, and the unattributed blended hero stats. Fixing those three alone would likely move credibility to B and overall to C+ or better.

---

# AFTER: redesigned local site (`./site`, branch `redesign/2026-11-18`)

Graded 2026-11-18 (America/New_York) against the local build served at `http://127.0.0.1:4173/`, using the same rubric and the same SDR/BDR hiring-manager point of view. **It is not deployed yet.** The live URL still serves the BEFORE site.

## Iteration log
| Loop | What changed | Result |
|---|---|---|
| 1 (first build) | New static site: SDR-first hero, stats labeled by business, interactive 6-step sales walkthrough with a sample lead clearly labeled as demo data, per-business proof with Selling/Operations/Systems filters, background/tools/education bento, contact with copy-email, mobile contact dock. Headshot cut from 767KB to 9-37KB (AVIF/WebP/JPEG), 40KB OG image, favicon.svg + .ico. Ramydia omitted; Codex/ChatGPT removed. | Overall A-. Mobile header hid the name, the mobile photo was too big, the "5 people" stat read awkwardly, and the contact divider ran past the content on desktop. |
| 2 | Fixed all of the above. Copy-email got a fallback after a test showed the Clipboard API can hang. Added `tools/interactions.cjs`, 12 checks, all passing. | Mobile and design improved. Organic Blends authorship checked against local git history. |
| 3 | Step tabs moved to 2 columns on mobile so "Close & collect" no longer wraps. One cobalt accent added to the headline. | Final grades below. |

## Measured (headless Chrome on this M1, local server)
| Metric | BEFORE (live) | AFTER (local) |
|---|---|---|
| Page height at 390px | 15,966px | 6,675px |
| Page height at 1440px | 9,746px | 4,110px |
| Transferred | ~888KB | ~48KB |
| Requests | 9 (+404 favicon) | 5, no errors |
| Headshot | 767KB PNG | 9KB AVIF (mobile) / 18KB (desktop) |
| OG image | 1.8MB PNG | 40KB JPEG |
| Hero CTA position at 390x844 | Below the fold | Bottom edge at 426px |
| Horizontal overflow at 390 | Step strips cut off | None (scrollWidth 390) |
| Em/en dashes, ChatGPT/Codex/Ramydia/bilingual/quota text | ChatGPT and Codex present | 0 |

Local-server numbers flatter speed. Re-measure on the real host after deploy.

## Grades
| Category | BEFORE | AFTER | One-line reason (AFTER) |
|---|---|---|---|
| **Overall recruitability (SDR/BDR)** | **D+** | **A-** | It reads as an SDR candidate in 5 seconds, every number carries its business label, contact is everywhere, and it matches the resume. It falls short of A only because Organic Blends isn't on the resume yet. |
| Credibility / trustworthiness | D | A- | All claims trace to the resume, except Organic Blends, which is verified from its local repo (README, commits authored as Jeremy Rodriguez) and labeled as a side project with no metrics. Recruiters can't check it against the resume. |
| First-impression design | B- | A- | A distinctive cobalt-on-off-white split hero with a real photo and an SDR-first headline, in light and dark mode. It is deliberately restrained (system fonts for speed), so it is polished rather than flashy. |
| Clarity of what he did at each business | C | A | One block per business with role and dates, and every bullet tagged Selling/Operations/Systems. The filter answers "show me his selling work" in one tap. |
| Mobile (390px) | C+ | A | CTA above the fold, a contact dock after the hero, no overflow, 44px+ tap targets, and a page under half its old length. |
| Speed | B | A | About 48KB total, 5 requests, no webfonts or framework, a preloaded AVIF hero, and no 404s (still to be confirmed on the production host). |
| Call to action / contact | C | A | "Email Jeremy" in the header, hero, mobile dock and contact block, plus copy-email, tap-to-call, LinkedIn, and a resume PDF download. |

## Still below A, and why (not fixable by inventing anything)
- **Credibility A-:** Organic Blends is real and verified locally, but it is not on the resume. To reach A, either add it to the resume (then the site and resume match 1:1) or remove it from the site. Jeremy's call.
- **Design A-:** a custom display font and real product screenshots (sanitized Simplistic CRM / Sugar Hill POS screens) would push it further, but real screens could expose customer data. Only add them after a manual scrub that Jeremy approves.
- **Overall A-:** follows from the two items above.

---

# PREVIEW: Projects section added (local site, branch `redesign/2026-11-18`)

Graded 2026-11-18 (America/New_York) against the local build at `http://127.0.0.1:4173/`, using the same rubric and the same SDR/BDR hiring-manager point of view. **Preview only. Nothing is deployed, and the live site is unchanged.**

## What changed since AFTER
- Organic Blends moved out of the job list into a new **Projects** section (nav link added), next to a new **Ramydia Home Health Care** project block. Paid roles (Simplistic, Sugar Hill, McCabe) stay in "What I did at each business".
- Ramydia wording comes only from `RAMYDIA_FACTS.md`, with no metrics, no patient or visit data, no internal controls, no vendor or tool names. Status pill: "Dry run, not in production".
- Organic Blends adds "Customers get live SMS queue updates" (verified 2026-11-18 per `RAMYDIA_FACTS.md`). Status pill: "Live". No phone number or vendor. English/Spanish is still described as a product feature.
- **Resume preview** (`preview/Resume_PREVIEW.pdf`, 1 page) now carries a PROJECTS line listing both, so the site and the *preview* resume match 1:1.
- Checks: 13/13 interaction checks pass (new: Projects holds 2 projects and none are counted as jobs). Zero console errors, zero failed requests, zero em/en dashes, zero hits for ChatGPT/Codex/bilingual/quota/vendor/patient terms. Page height is 4,462px at 1440 and 7,330px at 390; transfer is about 50KB.

## Grades
| Category | BEFORE | AFTER | PREVIEW | One-line reason (PREVIEW) |
|---|---|---|---|---|
| **Overall recruitability (SDR/BDR)** | **D+** | **A-** | **A-** | It is stronger and honest, but the resume a recruiter downloads from the site is still the old one without Projects until Jeremy approves the preview. |
| Credibility / trustworthiness | D | A- | A- | Every claim now has a home on the preview resume, and both projects are labeled as projects with honest status (Live / Dry run, not in production). It stays A- only because `site/Jeremy_Rodriguez_Resume.pdf` is intentionally still the pre-Projects resume. |
| First-impression design | B- | A- | A- | The new two-card Projects layout adds rhythm without clutter. Still a deliberately restrained system-font design rather than a showpiece. |
| Clarity of what he did at each business | C | A | A | Paid roles and side projects are now visibly separate, each project names what was built and its real status, and the filters still isolate selling work. |
| Mobile (390px) | C+ | A | A | No overflow, CTA above the fold, dock works, and the Projects cards stack cleanly. The page grew to 7,330px, still under half the original 15,966px. |
| Speed | B | A | A | About 50KB, 5 requests, no new assets, no 404s (still to be confirmed on the production host). |
| Call to action / contact | C | A | A | Unchanged: Email Jeremy in the header, hero, dock and contact block, plus copy, call, LinkedIn and resume. |

## Path to A (no new claims needed)
- Once Jeremy approves `preview/Resume_PREVIEW.pdf`, make it the new LATEST resume and replace `site/Jeremy_Rodriguez_Resume.pdf` with it. The downloadable resume then matches the site exactly, and credibility and overall move to **A**.
- Design stays A- unless he wants a custom display font or scrubbed real product screenshots (needs his approval for any real screens).
