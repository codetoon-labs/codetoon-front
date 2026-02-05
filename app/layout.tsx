import type { Metadata } from 'next';
import { Cairo } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "./LayoutContent";
import ScrollManager from "@/app/components/RefreshScrollRestoration";
import Script from "next/script";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Codetoon",
  description: "Full service digital agency, crafting tech and design solutions based in Egypt",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-website-id="dfid_CgRWCeHd3DFpRuCvrzfJR"
          data-domain="codetoon.net"
          src="https://datafa.st/js/script.js"
        />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <ScrollManager />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
