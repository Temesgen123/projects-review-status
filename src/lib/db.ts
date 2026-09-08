import { PrismaClient } from "@prisma/client";

// Standard PrismaClient — works with Neon's postgres:// connection string
// in Next.js Node.js runtime (no edge adapter needed).
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
