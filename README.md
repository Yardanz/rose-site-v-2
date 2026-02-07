This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Create a `.env.local` file based on `.env.example`.

```
DISCORD_WEBHOOK_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ADMIN_TOKEN=
```

## Supabase (reviews)

Create a `reviews` table in Supabase:

```sql
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  nickname text not null,
  comment text not null,
  profile_url text,
  status text not null check (status in ('pending','approved','rejected')),
  ip_hash text
);
```

## Deployment

This project can be deployed to Vercel with the default Next.js settings.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
