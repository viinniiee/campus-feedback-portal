# Campus Feedback Portal

A Vercel + Supabase implementation of the Web Technology laboratory project.

## Stack
- React + Vite
- Vercel deployment
- Supabase Auth + PostgreSQL
- GitHub source control

## Features retained from the lab project
- Registration and login
- Authentication/session state
- One-week `lastUser` browser cookie
- User/admin roles
- Feedback submission
- Persistent database storage
- Category filtering with asynchronous requests
- Admin feedback view

## Local setup
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and add the project URL and anon key.
4. Run `npm install`.
5. Run `npm run dev`.
6. Register a user. Promote the intended admin account with the SQL comment in `schema.sql`.

Do not commit `.env.local`.
