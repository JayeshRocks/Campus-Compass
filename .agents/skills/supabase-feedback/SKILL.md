---
name: supabase-feedback
description: Supabase backend integration skill for Campus Compass feedback collection, public anon key isolation, Edge Function security boundaries, and GitHub issue generation.
---

# Supabase Feedback Integration Skill

This skill details the backend architecture, database schema interaction, and security boundaries for the feedback system in Campus Compass.

---

## 1. System Architecture & Boundaries

The user feedback system operates under a strict security boundary:

```text
React Frontend (Public Anon Key)
       |
       v  Direct Table Insert
Supabase Database (`feedback` table)
       |
       v  Database Trigger / Edge Function
Supabase Edge Function (Secrets Vault with GitHub PAT)
       |
       v  HTTPS API
GitHub Issues Repository
```

- **Frontend Submissions**: User feedback forms submit directly to the Supabase `feedback` table using `@supabase/supabase-js` and public environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- **Edge Function Trigger**: GitHub issue creation is handled server-side by a Supabase Edge Function.
- **Frontend Token Isolation**: NEVER place GitHub API endpoints or GitHub Personal Access Tokens (PATs) in client-side React code. The GitHub Fine-grained PAT is strictly stored in the Supabase Edge Function Secrets vault.

---

## 2. Environment Variables

Client-side environment variables configured in Vite:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<public-anon-key>
```

---

## 3. Database Table Schema

Target table: `feedback`
- `id`: UUID (primary key, auto-generated)
- `created_at`: TIMESTAMPTZ (default `now()`)
- `type`: TEXT (e.g. `'bug'`, `'feature'`, `'building_update'`)
- `title`: TEXT
- `description`: TEXT
- `user_email`: TEXT (optional)
- `status`: TEXT (default `'pending'`)

---

## 4. Testing & Verification

- Verify feedback form submission handles network errors gracefully.
- Confirm submission feedback UI displays success notification upon database insertion.
- Ensure public anon key possesses INSERT permissions only on `feedback` table (RLS enabled).
