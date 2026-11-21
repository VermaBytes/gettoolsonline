# Notify-me setup

1. Create a Supabase project and run `supabase/notify-schema.sql` in its SQL editor.
2. Add these server-only environment variables to `.env.local` for local development and to the hosting provider for production:

   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. Redeploy the site. Never use a `NEXT_PUBLIC_` prefix for the service role key.

The API stores one row per normalized email and tool slug. Duplicate requests are ignored by the database unique constraint. The in-memory limit is five submissions per IP per hour per running server instance; production serverless deployments may run multiple instances, so use an edge/WAF or shared rate limiter if stronger enforcement is needed. The form collects interest only; it does not send email automatically or automatically expire rows. The site owner must use the saved requests to send the launch update and manually delete each request from the active table within 30 days after launch or a deletion request, as described in the Privacy Policy. Backups may expire later.
