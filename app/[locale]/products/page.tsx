import type { Metadata } from 'next';

// Placeholder route. Kept out of the sitemap and out of the index until it has
// real content — a heading-only page indexed at priority 0.8 was a thin-content
// signal on an otherwise small site.
export const metadata: Metadata = {
  title: 'Products',
  description: 'Codetoon products — coming soon.',
  robots: { index: false, follow: true },
};

function Products() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5fbfe] font-sans dark:bg-black">
      <h1 className="text-3xl font-bold">Products</h1>
    </div>
  );
}

export default Products;
