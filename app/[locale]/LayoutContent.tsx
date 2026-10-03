'use client';

import Header from "@/app/components/navbar/Header";
import Footer from "@/app/components/footer/Footer";
import CursorFollower from "@/app/components/cursorApp/CursorFollower";
import ScrollToTop from "@/app/components/ScrollToTop/ScrollToTop";
import WhatsAppWidget from "@/app/components/WhatsAppWidget/WhatsAppWidget";
import RefreshScrollRestoration from "@/app/components/RefreshScrollRestoration/RefreshScrollRestoration";
import { ApolloProvider } from "@/lib/apollo-provider";
import { ModalProvider } from "@/app/context/ModalContext";
import ContactModal from "@/app/components/contactUs/contactUs";
import { I18nProvider } from "@/lib/i18n/provider";
import type { Locale } from "@/lib/i18n/config";

export function LayoutContent({ children, locale, footerProjects = [] }: { children: React.ReactNode; locale: Locale; footerProjects?: any[] }) {
  return (
    <I18nProvider locale={locale}>
    <ApolloProvider>
      <ModalProvider>
        <RefreshScrollRestoration />
        <CursorFollower />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer projects={footerProjects} />
        <ScrollToTop />
        <WhatsAppWidget />
        <ContactModal />
      </ModalProvider>
    </ApolloProvider>
    </I18nProvider>
  );
}

