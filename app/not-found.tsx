import "./globals.css";

// Only reached for requests that bypass the locale middleware (e.g. a
// missing file). Every page route 404s inside app/[locale] instead.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center font-sans">
        <h1 className="text-2xl font-bold">Page not found</h1>
      </body>
    </html>
  );
}
