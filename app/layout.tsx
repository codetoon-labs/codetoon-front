import type { Metadata } from 'next';
import { Cairo } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "./LayoutContent";
import ScrollManager from "@/app/components/RefreshScrollRestoration";
import Script from "next/script";
import JsonLd from "@/app/components/JsonLd";
import { getProjects } from "@/lib/server-data";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://codetoon.net/#organization",
  name: "Codetoon",
  url: "https://codetoon.net",
  logo: "https://codetoon.net/logo.svg",
  image: "https://codetoon.net/codetoon-og.png",
  description:
    "Full service digital agency, crafting tech and design solutions based in Egypt",
  email: "Info@Codetoon.net",
  telephone: "+201156167758",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "316 Ninety Road, Sector 2, Office No. 3, Third Floor, 5th Settlement",
    addressLocality: "New Cairo",
    addressRegion: "Cairo",
    addressCountry: "EG",
  },
  areaServed: "EG",
  sameAs: [
    "https://x.com/Codetooneg",
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://codetoon.net/#website",
  name: "Codetoon",
  url: "https://codetoon.net",
  publisher: { "@id": "https://codetoon.net/#organization" },
};

const cairo = Cairo({
  subsets: ["latin"],
  weight: [ "400", "500", "600"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codetoon.net"),
  title: {
    default: "Codetoon | transform your ideas into reality",
    template: "%s | Codetoon",
  },
  description: "Full service digital agency, crafting tech and design solutions based in Egypt",
  // Every page inherits a self-referencing canonical unless it sets its own.
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Codetoon",
    locale: "en_US",
    type: "website",
    images: [{ url: "/codetoon-og.png", width: 1200, height: 630, alt: "Codetoon" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Codetooneg",
    creator: "@Codetooneg",
    images: ["/codetoon-og.png"],
  },
};

// Refresh CMS-fetched content hourly (pages are otherwise prerendered/cached)
export const revalidate = 3600;



const GTM_ID = "GTM-T4S9DF3V";
const isProduction = process.env.NODE_ENV === "production";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerProjects = await getProjects();
  return (
    <html lang="en">
      <head>
        {/* CMS image origin — every project/service image loads from here, so
            open the connection during HTML parse instead of at first <img>. */}
        <link
          rel="preconnect"
          href="https://fls-9eac8cc6-db93-413e-bfc5-41e16a4267ee.laravel.cloud"
          crossOrigin=""
        />
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
            strategy="lazyOnload"
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
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <ScrollManager />
        <LayoutContent footerProjects={footerProjects}>{children}</LayoutContent>
      </body>
    </html>
  );
}
