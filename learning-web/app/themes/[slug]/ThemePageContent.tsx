'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiChevronLeft, FiBook } from 'react-icons/fi';
import { LectureItem } from '@/components/LectureItem';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { getDifficultyRange } from '@/components/ThemeCard';

interface LectureMetadata {
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  order: number;
}

interface Theme {
  slug: string;
  metadata: {
    title: string;
    description: string;
    tags: string[];
  };
  lectures: LectureMetadata[];
}

interface ThemePageContentProps {
  params: Promise<{ slug: string }>;
}

export default function ThemePageContent({ params }: ThemePageContentProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/themes/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notFound();
        }
        setTheme(data);
        setLoading(false);
      })
      .catch(() => notFound());
    
    const stored = localStorage.getItem(`progress-${slug}`);
    if (stored) {
      setCompleted(JSON.parse(stored));
    }
  }, [slug]);

  if (loading || !theme) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          Loading...
        </div>
      </div>
    );
  }

  const difficultyRange = getDifficultyRange(theme.lectures);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{theme.metadata.title}</h1>
        <p className="text-[var(--muted-foreground)]">{theme.metadata.description}</p>
        
        <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="flex items-center gap-1.5">
            <FiBook className="w-4 h-4" />
            {theme.lectures.length} lectures
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            difficultyRange.max === 'Advanced' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' :
            difficultyRange.max === 'Intermediate' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
          }`}>
            {difficultyRange.min} → {difficultyRange.max}
          </span>
        </div>
      </header>

      <div className="mb-6 p-4 rounded-lg bg-[var(--muted)]">
        <ProgressIndicator 
          themeSlug={slug} 
          totalLectures={theme.lectures.length} 
        />
      </div>

      <section className="space-y-3">
        {theme.lectures.map((lecture, index) => (
          <LectureItem
            key={lecture.slug}
            themeSlug={slug}
            lecture={lecture}
            isCompleted={completed.includes(lecture.slug)}
            index={index}
          />
        ))}
      </section>
    </div>
  );
}