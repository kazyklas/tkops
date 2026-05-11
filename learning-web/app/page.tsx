'use client';

import { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { ThemeCard, getDifficultyRange } from '@/components/ThemeCard';

interface ThemeMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverImage?: string;
}

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
  metadata: ThemeMetadata;
  lectures: LectureMetadata[];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/themes')
      .then(res => res.json())
      .then(data => {
        setThemes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredThemes = useMemo(() => {
    if (!searchQuery.trim()) return themes;
    const query = searchQuery.toLowerCase();
    return themes.filter(theme => 
      theme.metadata.title.toLowerCase().includes(query) ||
      theme.metadata.description.toLowerCase().includes(query) ||
      theme.metadata.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [themes, searchQuery]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Master New Skills with LearnHub
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Structured learning paths from beginner to advanced. 
          Build practical knowledge through hands-on lectures.
        </p>
      </section>

      <section className="mb-8">
        <div className="relative max-w-md mx-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>
      </section>

      {loading ? (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          Loading themes...
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2">
          {filteredThemes.map(theme => {
            const difficultyRange = getDifficultyRange(theme.lectures);
            return (
              <ThemeCard 
                key={theme.slug} 
                theme={theme} 
                difficultyRange={difficultyRange}
              />
            );
          })}
        </section>
      )}

      {filteredThemes.length === 0 && !loading && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No themes found matching &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  );
}