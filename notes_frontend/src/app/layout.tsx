import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes | Personal Notes Manager",
  description: "Create, edit, and manage personal notes with Markdown support.",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "manifest", url: "/site.webmanifest" }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
