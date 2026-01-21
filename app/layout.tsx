import type { Metadata } from 'next';
import { Cairo } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "./LayoutContent";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "CodeToon",
  description: "Full service digital agency, crafting tech and design solutions based in Egypt",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} font-sans antialiased`}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
