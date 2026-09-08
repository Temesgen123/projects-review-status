# Projects Review Status

A multi-project file development tracker built with **Next.js 14**, **TypeScript**, **Prisma**, and **Neon Postgres**.

Track `Tested`, `Cleaned`, and `Reviewed` status for every file across all your projects.

---

## Tech Stack

- **Next.js 14** (App Router, Server Components)
- **TypeScript**
- **Prisma ORM** (standard Node.js client)
- **Neon Postgres** (serverless PostgreSQL — connect via standard `postgresql://` URL)

---

## Getting Started

### 1. Clone & install dependencies

```bash
cd projects-review-status
npm install
```

### 2. Set up Neon Postgres

1. Go to [https://console.neon.tech](https://console.neon.tech) and create a free account.
2. Create a new project (e.g. `projects-review-status`).
3. Copy your **connection string** — it looks like:
   ```
   postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and paste your Neon connection string:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 4. Push the database schema

```bash
npm run db:push
```

This creates the `Project` and `File` tables in your Neon database.

### 5. Generate Prisma Client

```bash
npm run db:generate
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── projects/
│   │   │   ├── route.ts                  # GET all, POST create
│   │   │   └── [projectId]/
│   │   │       ├── route.ts              # GET one, PATCH, DELETE
│   │   │       └── files/
│   │   │           └── route.ts          # POST add file to project
│   │   └── files/
│   │       └── [fileId]/
│   │           └── route.ts              # PATCH update, DELETE file
│   ├── projects/
│   │   └── [projectId]/
│   │       └── page.tsx                  # Project detail page
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx                          # Home: all projects
├── components/
│   ├── Checkbox.tsx
│   ├── FileRow.tsx
│   ├── Icons.tsx
│   ├── NewProjectModal.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectDetailClient.tsx
│   ├── ProjectsHomeClient.tsx
│   └── StatBadge.tsx
├── lib/
│   └── db.ts                             # Prisma + Neon singleton
└── types/
    └── index.ts
prisma/
└── schema.prisma
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema to Neon (no migrations) |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import into [Vercel](https://vercel.com).
3. Add `DATABASE_URL` as an environment variable in your Vercel project settings.
4. Deploy — Vercel will run `next build` automatically.

> **Note:** Neon's serverless driver works natively with Vercel Edge and Node.js runtimes.
