import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projects Review Status",
  description: "Track file-level test, clean, and review status across projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
