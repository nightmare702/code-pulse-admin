# Code Pulse Admin

A separate Next.js administration workspace for Code Pulse.

## Current state
- Initial responsive admin shell is in place.
- No production user, trading, or commission data is fabricated.
- Supabase authentication, database schema, and verified integrations are not configured yet.
- Existing Code Pulse and the AppDeploy preview are not modified by this repository.

## Local development

```bash
npm install
npm run dev
```

Create a local `.env.local` from `.env.example` when Supabase is configured. Never commit secrets.
