import { notFound } from 'next/navigation';

// Unmatched paths under a locale render that locale's not-found page, inside
// the localized layout (header, footer, dir), instead of the bare global 404.
export default function CatchAll() {
  notFound();
}
