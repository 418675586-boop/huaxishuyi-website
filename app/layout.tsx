import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";
import Footer2 from "@/components/blocks/footer-2";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <Providers>
          <SkipToContent />
          <div className="flex min-h-screen flex-1 flex-col">{children}</div>
          <Footer2 />
        </Providers>
      </body>
    </html>
  );
}
