// The real root layout (<html lang dir>) is app/[locale]/layout.tsx, since
// the document language depends on the route. This pass-through exists so
// app/not-found.tsx has a parent for requests that never reach [locale].
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
