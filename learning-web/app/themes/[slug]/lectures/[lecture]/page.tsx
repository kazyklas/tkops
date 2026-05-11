import { Suspense } from 'react';
import LecturePageContent from './LecturePageContent';

export default function LecturePage({ params }: { params: Promise<{ slug: string; lecture: string }> }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8"><div className="text-center py-12">Loading...</div></div>}>
      <LecturePageContent params={params} />
    </Suspense>
  );
}