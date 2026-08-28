---
trigger: always_on
---

# Security & Licensing Compliance Rules

## Purpose

These rules enforce strict AGPL-3.0 open-source licensing compliance, backend security boundaries, and secret protection for Campus Compass.

---

## 1. AGPL-3.0 Open-Source Licensing Compliance

- **Project License**: Campus Compass is strictly licensed under AGPL-3.0.
- **Dependency Compatibility**: Any new npm package or third-party dependency introduced MUST be compatible with AGPL-3.0 (e.g., MIT, ISC, Apache 2.0, BSD-2/3-Clause).
- **Prohibited Licenses**: Do NOT introduce proprietary, commercial, non-commercial-only, or copyleft-incompatible libraries.
- **Attribution Preservation**: Maintain full, visible map provider attributions (OpenStreetMap, OpenFreeMap, Esri) in the user interface.

---

## 2. Supabase Backend & Feedback System Security

- **Direct Supabase Submissions**: User feedback forms submit directly to the Supabase database (`feedback` table) using the public Supabase anon key.
- **GitHub API Isolation**: Issue creation on GitHub is executed strictly via a Supabase Edge Function.
- **Frontend Security Boundary**: NEVER place GitHub API requests or GitHub Personal Access Tokens (PATs) in the frontend React codebase.
- **Edge Function Secrets Vault**: The GitHub Fine-grained PAT is stored securely inside the Supabase Edge Function Secrets vault.

---

## 3. Secret & Credential Protection

- **No Committed Secrets**: Never commit private keys, service account credentials, database admin tokens, or GitHub tokens to Git.
- **Environment Variables**: Use `VITE_` prefixed environment variables for public client configuration (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- **Gitignore Safety**: Ensure `.env`, `.env.local`, `.env.production`, and credential files are ignored by version control.
