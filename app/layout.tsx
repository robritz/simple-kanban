import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Simple Kanban" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://use.typekit.net/wab8jvn.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
