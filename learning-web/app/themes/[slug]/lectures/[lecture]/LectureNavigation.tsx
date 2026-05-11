'use client';

import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiCheck, FiCheckCircle } from 'react-icons/fi';
import { useLectureProgress } from '@/components/ProgressIndicator';
import { useEffect, useState } from 'react';

interface AdjacentLecture {
  slug: string;
  title: string;
}

interface LectureNavigationProps {
  themeSlug: string;
  prev: AdjacentLecture | null;
  next: AdjacentLecture | null;
}

export function LectureNavigation({ themeSlug, prev, next }: LectureNavigationProps) {
  const { isCompleted, toggleCompleted } = useLectureProgress(themeSlug);
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const path = window.location.pathname;
    const match = path.match(/lectures\/([^/]+)/);
    if (match) setCurrentSlug(match[1]);
  }, []);

  if (!mounted) return null;

  const isCurrentCompleted = currentSlug && isCompleted(currentSlug);

  return (
    <div className="mt-12 pt-8 border-t border-[var(--border)]">
      {currentSlug && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => toggleCompleted(currentSlug)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isCurrentCompleted
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-800'
                : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
            }`}
          >
            {isCurrentCompleted ? (
              <>
                <FiCheckCircle className="w-5 h-5" />
                Completed
              </>
            ) : (
              <>
                <FiCheck className="w-5 h-5" />
                Mark as Complete
              </>
            )}
          </button>
        </div>
      )}

      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            href={`/themes/${themeSlug}/lectures/${prev.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <FiChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{prev.title}</span>
            <span className="sm:hidden">Previous</span>
          </Link>
        ) : <div />}

        {next ? (
          <Link
            href={`/themes/${themeSlug}/lectures/${next.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] ml-auto"
          >
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">Next</span>
            <FiChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}