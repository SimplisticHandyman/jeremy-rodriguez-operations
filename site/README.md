# jeremyrodriguezoperations.com (static portfolio)

Plain HTML/CSS/JS with no build step. Deploy the contents of this `site/` folder as-is.

## Preview locally
```bash
cd site && python3 -m http.server 4173 --bind 127.0.0.1
# open http://127.0.0.1:4173/
```

## Checks (from repo root, on Jeremy's M1)
```bash
node tools/interactions.cjs http://127.0.0.1:4173/          # 12 interaction checks
node tools/screenshot.cjs http://127.0.0.1:4173/ screenshots after
```

## Content rules (must stay true on every edit)
- AI tools: Claude Code and Claude only. Never ChatGPT or Codex.
- $54K = approximately $54K first-year business revenue at Simplistic Handyman LLC. Never a quota.
- Stats stay labeled by business: Simplistic (≈$54K, 5 subcontractors); Sugar Hill Hardware (20-30 labor jobs/month, 5-person team).
- Education: HVAC/R Studies, TCI, 2014-2016; coursework ended when the institution closed; no degree awarded.
- Languages: English. The Organic Blends English/Spanish check-in is a product feature, not a language skill.
- No SaaS SDR experience implied. No street addresses. Ramydia Home Health Care is an approved project (schedule-change documentation workflow, live in production per Jeremy on 2026-11-18); keep it framed as a project, not healthcare experience or a paid job, with no invented metrics.
- Every fact must be on the resume or verifiable in a local repo.
