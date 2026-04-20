'use client';

import Header from "./components/navbar/Header";
import Footer from "./components/footer/Footer";
import CursorFollower from "./components/cursorApp/page";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import RefreshScrollRestoration from "./components/RefreshScrollRestoration/RefreshScrollRestoration";
import { ApolloProvider } from "@/lib/apollo-provider";
import { ModalProvider } from "./context/ModalContext";
import ContactModal from "./components/contactUs/contactUs";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <ModalProvider>
        <RefreshScrollRestoration />
        <CursorFollower />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <ContactModal />
      </ModalProvider>
    </ApolloProvider>
  );
}

