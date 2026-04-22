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



const GTM_ID = "GTM-T4S9DF3V";
const isProduction = process.env.NODE_ENV === "production";

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
        {/* Google Tag Manager — production only */}
        {isProduction && GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) — production only */}
        {isProduction && GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ScrollManager />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
