import { PrismaClient } from "@prisma/client";

// Standard PrismaClient — works with Neon's postgres:// connection string
// in Next.js Node.js runtime (no edge adapter needed).
// Lazy singleton: only instantiated on first call, never at build time.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const db = getDb();
