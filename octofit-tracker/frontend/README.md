# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, React Router, and Bootstrap. Its views
load activities, leaderboard entries, teams, users, and workouts from the API.

## API URL configuration

In Codespaces, Vite automatically uses the Codespace's `CODESPACE_NAME` to
connect to the forwarded API port. To override it, define `VITE_CODESPACE_NAME`
in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The API URL is built as
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Replace the example value
with your Codespace name, then restart Vite after changing `.env.local`.

When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to
`http://localhost:8000` for local development.

## Run the frontend

From the repository root:

```bash
npm run dev --prefix octofit-tracker/frontend
```
