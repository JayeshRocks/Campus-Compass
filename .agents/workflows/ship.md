---
description: Perform final release verification and production build checks for Campus Compass.
---

# Ship Workflow

## Purpose

Final verification workflow before deploying or tagging a release of Campus Compass.

---

## 1. Pre-Release Checklist

Verify all release criteria:

- [ ] All feature requirements satisfied per implementation plan.
- [ ] `npm run lint` passes with 0 errors or warnings.
- [ ] `npm run build` compiles `tsc -b && vite build` into `dist/` cleanly.
- [ ] Map provider attributions (OpenStreetMap, CARTO, Esri) fully visible and un-truncated.
- [ ] No secrets, private API tokens, or GitHub PATs present in frontend React source.
- [ ] AGPL-3.0 open-source licensing attributions maintained.
- [ ] `git status` clean of unwanted build artifacts or temporary files.

---

## 2. Release Execution

Run production build command:

```powershell
npm run build
```

Confirm `dist/` directory generated with static assets.
