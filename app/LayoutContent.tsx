'use client';

import Header from "./components/navbar/Header";
import Footer from "./components/footer/Footer";
import CursorFollower from "./components/cursorApp/page";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ApolloProvider } from "@/lib/apollo-provider";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <CursorFollower />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </ApolloProvider>
  );
}

