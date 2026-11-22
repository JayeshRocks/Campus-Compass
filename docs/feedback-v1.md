# Private feedback inbox v1

The map modal and the Report an Issue page share one form and submit to `POST /api/feedback`. The receipt means the report was written to Supabase, not that a public issue was created. Reports can include an optional building or manually selected map pin and an optional reply email. There is no account, name field, automatic location collection, or GitHub publisher in this flow.

## Review and staging

- Do not merge or apply the migration to the production project as part of this draft. Use a separate Supabase staging project and a Vercel Preview deployment. Leave the existing feedback table, records, and old publisher untouched.
- Apply only the new migration to staging. If using a preview deployment, configure the feedback environment variables for **Preview** and the intended branch only. Never prefix the server key or rate-limit secret with `VITE_`, and never put production Supabase credentials into the staging feedback settings.
| Preview setting | Purpose |
| --- | --- |
| `FEEDBACK_STAGING_ENABLED` | Set to `true` only for the reviewed preview branch. |
| `FEEDBACK_STAGING_SUPABASE_URL` | HTTPS URL of the separate staging Supabase project. |
| `FEEDBACK_STAGING_SUPABASE_KEY` | Server-only Supabase secret key (`sb_secret_`); not a publishable key. |
| `FEEDBACK_STAGING_RATE_SECRET` | Separate random secret of at least 32 characters for hashing client addresses; raw addresses are not saved by this endpoint. |
| `VERCEL_ENV` | Must be the platform-provided `preview` value. |

- The API is disabled by default, including on production and an unconfigured preview. Plain `npm run dev` does not serve Vercel functions. For functional browser testing, use the configured protected preview or a local mock API with synthetic data.
- In the preview, try both entry points. Submit one report with no email and one with a synthetic reply email and an explicitly selected location. Check that both arrive in the private staging inbox. Repeat an identical request ID to confirm it is saved once. Test an invalid request, a temporary failure and a retry, and verify limits on a controlled test connection. Verify unauthenticated and ordinary signed-in clients cannot read reports or directly invoke the write RPC. No GitHub issue should be created.
- Separately smoke-test map controls, normal navigation, and theme switching; the feedback redesign does not change the main map's location or navigation behavior.

The endpoint allows up to eight new reports per client and 120 overall per UTC hour. Shared school networks may share a client allowance; monitor this limit in staging. Request retries for an already-saved, identical report do not count again. Run `node --test tests/feedback.test.mjs` for endpoint checks, and run `tests/feedback-v1-db.sql` against an empty disposable database with Supabase roles after the migration.

## Maintainer workflow

Use the Supabase Table Editor for `campus_feedback_v1_private.feedback_v1`, with only authorized project members. Review the report there. If it merits tracking publicly, create a GitHub issue by hand with a new technical title and a sanitized summary. Never copy the original report, contact details, or precise pins into a public issue. Use an approved team retention policy for feedback and optional reply emails before production rollout.

## Rollout and rollback

Production enablement is a separate decision. Review the current triggers, webhooks, database grants, and secret scope first. Verify none can send the new reports to GitHub. Keep historical feedback out of the new pipeline. After staging review, decide how to enable production for the new endpoint and table, then roll out the app and API together. Roll back the application deployment if needed; do not drop the inbox or delete old reports as part of an app rollback.
