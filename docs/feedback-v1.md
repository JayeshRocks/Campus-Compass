# Private feedback inbox v1

The map popup and the Report an Issue page keep their original visual design. Both submit to `POST /api/feedback` with a category and description, plus an optional email for private follow-up. No name, account, or automatic location is collected. For a location-related report, a visitor can optionally pick an existing campus place or manually attach a map pin. The selection describes the issue, not the visitor’s live location, and stays in the private inbox. A receipt means the report was written to Supabase, not that a public issue was created.

## Review and staging

- Keep the PR in draft until the hosted submission checks pass. Use a separate Supabase staging project and a Vercel Preview deployment. Leave the existing feedback table, records, and old publisher untouched.
- Apply the private inbox migration to staging. If using a preview deployment, configure the feedback environment variables for **Preview** and the intended branch only. Never prefix the server key or rate-limit secret with `VITE_`, and never put production Supabase credentials into the staging feedback settings.
| Preview setting | Purpose |
| --- | --- |
| `FEEDBACK_STAGING_ENABLED` | Set to `true` only for the reviewed preview branch. |
| `FEEDBACK_STAGING_SUPABASE_URL` | HTTPS URL of the separate staging Supabase project. |
| `FEEDBACK_STAGING_SUPABASE_KEY` | Server-only Supabase secret key (`sb_secret_`); not a publishable key. |
| `FEEDBACK_STAGING_RATE_SECRET` | Separate random secret of at least 32 characters for hashing client addresses; raw addresses are not saved by this endpoint. |
| `VERCEL_ENV` | Must be the platform-provided `preview` value. |

- The API stays disabled in any environment without explicit enablement and valid settings, and never falls back to another environment. Plain `npm run dev` does not serve Vercel functions. For functional browser testing, use the configured protected preview or a local mock API with synthetic data.
- In the preview, try both entry points. Submit from both entry points using synthetic descriptions, one with no email and one with a synthetic reply email. Try a map-related report with a campus place or a manually selected pin, then another report without any location. Check that the private inbox records only fields explicitly provided. With preview intake disabled, check that the inline notice appears by the unchanged submit button and that the form retains its contents. Repeat an identical request ID to confirm it is saved once. Test an invalid request, a temporary failure and a retry, and verify limits on a controlled test connection. Verify unauthenticated and ordinary signed-in clients cannot read reports or directly invoke the write RPC. No GitHub issue should be created.
- Separately smoke-test map controls, normal navigation, and theme switching; the feedback backend change does not change the main map's location or navigation behavior.

The endpoint allows up to eight new reports per client and 120 overall per UTC hour. Shared school networks may share a client allowance; monitor this limit in staging. Request retries for an already-saved, identical report do not count again. Run `node --test tests/feedback.test.mjs` for endpoint checks, and run `tests/feedback-v1-db.sql` against an empty disposable database with Supabase roles after the migration.

## Maintainer workflow

Use the Supabase Table Editor for `campus_feedback_v1_private.feedback_v1`, with only authorized project members. Review the report there. If it merits tracking publicly, create a GitHub issue by hand with a new technical title and a sanitized summary. Never copy the original report, contact details, or precise pins into a public issue. Use an approved team retention policy for feedback and optional reply emails before production rollout.

## Rollout and rollback

Do not merge yet if hosted staging is unverified or the production configuration is not ready. Leave the existing app database and legacy publisher untouched.

1. After staging checks pass, select a dedicated feedback-only Supabase project for production, separate from the existing app database and staging. Confirm the project, plan, and permissions before changing anything. Apply the isolated migration there; check that no webhook or trigger can publish its data and that only authorized maintainers will have access.
2. In Vercel, scope the settings below to **Production** only. Never commit or chat a secret, and never put it in a client-side `VITE_` variable. Set separate values for staging and production. Do not use an all-project account token.
3. Verify those settings are present before merging. Then deploy and smoke-test the live form using a clearly labeled synthetic report with no personal information. Confirm the private row arrived and no GitHub issue was created. Do not migrate or republish historical feedback.
4. If the production check fails, roll back the app deployment rather than dropping the inbox. Preserve original and new records.

| Production setting | Purpose |
| --- | --- |
| `FEEDBACK_PRODUCTION_ENABLED` | Explicitly set `true` only after hosted staging is verified and the private inbox is ready. |
| `FEEDBACK_PRODUCTION_SUPABASE_URL` | HTTPS URL of the dedicated production feedback project. |
| `FEEDBACK_PRODUCTION_SUPABASE_KEY` | Server-only `sb_secret_` key scoped to that dedicated project. |
| `FEEDBACK_PRODUCTION_RATE_SECRET` | Fresh random secret, at least 32 characters, different from staging. |
| `VERCEL_ENV` | Must be the platform-provided `production` value. |
