'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiClock, FiChevronLeft, FiChevronRight, FiCheck, FiCheckCircle, FiList } from 'react-icons/fi';
import { MDXContent } from '@/components/MDXContent';

interface LectureMetadata {
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
}

interface AdjacentLecture {
  slug: string;
  title: string;
}

interface Lecture {
  slug: string;
  metadata: LectureMetadata;
  content: string;
  adjacent: {
    prev: AdjacentLecture | null;
    next: AdjacentLecture | null;
  };
}

interface ThemeLecture {
  slug: string;
  title: string;
}

interface Theme {
  metadata: { title: string };
  lectures: ThemeLecture[];
}

interface LecturePageContentProps {
  params: Promise<{ slug: string; lecture: string }>;
}

export default function LecturePageContent({ params }: LecturePageContentProps) {
  const resolvedParams = use(params);
  const themeSlug = resolvedParams.slug;
  const lectureSlug = resolvedParams.lecture;
  
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);
  const [headings, setHeadings] = useState<{id: string; text: string; level: number}[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`/api/themes/${themeSlug}/lectures/${lectureSlug}`),
      fetch(`/api/themes/${themeSlug}`)
    ])
      .then(([lecRes, themeRes]) => Promise.all([lecRes.json(), themeRes.json()]))
      .then(([lecData, themeData]) => {
        if (lecData.error || themeData.error) {
          notFound();
        }
        
        setLecture(lecData);
        setTheme(themeData);
        setLoading(false);
        
        const stored = localStorage.getItem(`progress-${themeSlug}`);
        if (stored) {
          setCompleted(JSON.parse(stored));
        }
        
        if (lecData.content) {
          const lines: string[] = lecData.content.split('\n');
          const extracted: {id: string; text: string; level: number}[] = [];
          lines.forEach((line: string) => {
            const match = line.match(/^(#{2,3})\s+(.+)$/);
            if (match) {
              const level = match[1].length;
              const text = match[2].trim();
              const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
              extracted.push({ id, text, level });
            }
          });
          setHeadings(extracted);
        }
      })
      .catch(() => notFound());
  }, [themeSlug, lectureSlug]);

  const isCompleted = lectureSlug && completed.includes(lectureSlug);
  
  const toggleComplete = () => {
    const newCompleted = isCompleted
      ? completed.filter(s => s !== lectureSlug)
      : [...completed, lectureSlug];
    setCompleted(newCompleted);
    localStorage.setItem(`progress-${themeSlug}`, JSON.stringify(newCompleted));
  };

  const difficultyColors = {
    beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  };

  if (loading || !lecture || !theme) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center py-12 text-[var(--muted-foreground)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Home</Link>
        <span className="text-[var(--muted-foreground)]">/</span>
        <Link href={`/themes/${themeSlug}`} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">{theme.metadata.title}</Link>
        <span className="text-[var(--muted-foreground)]">/</span>
        <span className="text-[var(--foreground)]">{lecture.metadata.title}</span>
      </nav>

      <div className="lg:flex lg:gap-8">
        <article className="flex-1 min-w-0">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{lecture.metadata.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4" />
                {lecture.metadata.estimatedMinutes} min read
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[lecture.metadata.difficulty] || 'bg-gray-100'}`}>
                {lecture.metadata.difficulty.charAt(0).toUpperCase() + lecture.metadata.difficulty.slice(1)}
              </span>
            </div>
          </header>

          <MDXContent source={lecture.content} />

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <div className="mb-8 flex justify-center">
              <button
                onClick={toggleComplete}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 hover:bg-emerald-200'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
                }`}
              >
                {isCompleted ? (
                  <><FiCheckCircle className="w-5 h-5" /> Completed</>
                ) : (
                  <><FiCheck className="w-5 h-5" /> Mark as Complete</>
                )}
              </button>
            </div>

            <div className="flex justify-between gap-4">
              {lecture.adjacent.prev ? (
                <Link
                  href={`/themes/${themeSlug}/lectures/${lecture.adjacent.prev.slug}`}
                  className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{lecture.adjacent.prev.title}</span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}

              {lecture.adjacent.next ? (
                <Link
                  href={`/themes/${themeSlug}/lectures/${lecture.adjacent.next.slug}`}
                  className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] ml-auto"
                >
                  <span className="hidden sm:inline">{lecture.adjacent.next.title}</span>
                  <span className="sm:hidden">Next</span>
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </article>

        <aside className="hidden lg:block w-64 flex-shrink-0">
          {headings.length > 0 && (
            <nav className="sticky top-24">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                <FiList className="w-4 h-4" />
                On this page
              </div>
              <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: heading.level === 3 ? '1rem' : '0' }}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="block py-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          
          <div className="sticky top-24 mt-8">
            <h3 className="text-sm font-medium mb-3">Lectures in this theme</h3>
            <ul className="space-y-2 text-sm">
              {theme.lectures.map((lec, index) => (
                <li key={lec.slug}>
                  <Link
                    href={`/themes/${themeSlug}/lectures/${lec.slug}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      lec.slug === lectureSlug
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
                    }`}
                  >
                    {index + 1}. {lec.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
