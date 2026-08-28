---
description: Systematically verify an implemented feature or fix in Campus Compass before declaring completion.
---

# Test Feature Workflow

## Purpose

Verify feature behavior, spatial rendering, component interactions, and static analysis checks before declaring work complete.

---

## 1. Static Analysis & Build Check

Execute project verification commands:

```powershell
npm run lint; npm run build
```

Verify:
- Zero ESLint errors or warnings.
- Clean TypeScript type-checking (`tsc -b`) and Vite production bundle compilation.

---

## 2. Interactive & 3D Map Testing

Verify runtime behavior:
- **Map Camera Smoothness**: Confirm pitch, bearing, and zoom persist when toggling between tabs.
- **Search & Building Details**: Verify searching buildings filters correctly without UI layout reflows.
- **Dark/Light Mode**: Check hover states and text legibility in both light mode and dark mode.
- **Map Attribution Visibility**: Ensure OpenStreetMap, CARTO, and Esri attributions remain fully visible and wrap dynamically without text-overflow truncation.

---

## 3. Defect Recovery

If any check fails:
- Inspect error tracebacks immediately.
- Fix underlying contracts rather than swallowing errors or using silent `try/catch` fallbacks.
- Re-run `npm run lint; npm run build`.
