import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "./components/navbar/Header";
import Footer from "./components/footer/Footer";
import CursorFollower from "./components/cursorApp/page";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const cairo = Cairo({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-cairo",
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
        title: 'CodeToon',
        description: 'CodeToon is a software development company that provides custom software solutions to businesses of all sizes.',
        icons: {
            icon: '/favicon.ico',
        },
        openGraph: {
            images: '/favicon_io/og-image.png',
        },
    }
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable} font-sans antialiased`}
      >
      <CursorFollower />
      <Header />
      <main className="min-h-screen">
          {children}
      </main>
      <Footer />
      <ScrollToTop />
      </body>
    </html>
  );
}
