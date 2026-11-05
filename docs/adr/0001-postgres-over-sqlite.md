# Postgres (Neon via Vercel) instead of SQLite

SQLite was the first choice, but Vercel's serverless functions have an ephemeral filesystem, so a local SQLite file would lose every write in production. We chose Postgres hosted on Neon through the Vercel Marketplace over hosted SQLite (Turso) to stay on Vercel's first-party integration, with local development pointed at a Neon dev branch rather than a local database.
