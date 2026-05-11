import { Suspense } from 'react';
import ThemePageContent from './ThemePageContent';

export default function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-8"><div className="text-center py-12">Loading...</div></div>}>
      <ThemePageContent params={params} />
    </Suspense>
  );
}