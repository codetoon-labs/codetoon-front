import type { Metadata } from 'next';
import { Cairo } from "next/font/google";
import "../globals.css";
import { LayoutContent } from "./LayoutContent";
import ScrollManager from "@/app/components/RefreshScrollRestoration";
import Script from "next/script";
import JsonLd from "@/app/components/JsonLd";
import { graph, organization, website } from "@/lib/structured-data";
import { getProjects } from "@/lib/server-data";
import { dirOf, locales, localeAlternates, ogLocale } from "@/lib/i18n/config";
import { getMessages, resolveLocale } from "@/lib/i18n/server";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: [ "400", "500", "600"],
  variable: "--font-cairo",
  display: "swap",
});

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getMessages(locale).common.meta;
  return {
    metadataBase: new URL("https://codetoon.net"),
    title: {
      default: t.defaultTitle,
      template: "%s | Codetoon",
    },
    description: t.description,
    // Every page inherits a self-referencing canonical (plus hreflang pairs)
    // unless it sets its own. The path is unknown at layout level, so pages
    // with their own URL override this.
    alternates: localeAlternates("/", locale),
    openGraph: {
      siteName: "Codetoon",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
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
}

// Refresh CMS-fetched content hourly (pages are otherwise prerendered/cached)
export const revalidate = 3600;



const GTM_ID = "GTM-T4S9DF3V";
const isProduction = process.env.NODE_ENV === "production";

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale = await resolveLocale(params);
  const footerProjects = await getProjects(locale);
  return (
    <html lang={locale} dir={dirOf(locale)}>
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
        <JsonLd data={graph(organization(locale), website(locale))} />
        <ScrollManager />
        <LayoutContent locale={locale} footerProjects={footerProjects}>{children}</LayoutContent>
      </body>
    </html>
  );
}
