/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required for Prisma in Next.js 15
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
};

module.exports = nextConfig;
