import Link from 'next/link';
import { FiBook } from 'react-icons/fi';

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

interface DifficultyBadgeProps {
  min: string;
  max: string;
}

function DifficultyBadge({ min, max }: DifficultyBadgeProps) {
  const maxColor = {
    'Beginner': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    'Intermediate': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    'Advanced': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  }[max] || 'bg-gray-100 text-gray-800';

  if (min === max) {
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${maxColor}`}>
        {min}
      </span>
    );
  }

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${maxColor}`}>
      {min} → {max}
    </span>
  );
}

interface ThemeCardProps {
  theme: Theme;
  difficultyRange: { min: string; max: string };
}

export function ThemeCard({ theme, difficultyRange }: ThemeCardProps) {
  return (
    <Link
      href={`/themes/${theme.slug}`}
      className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] hover:shadow-sm transition-all"
    >
      <div className="mb-3">
        <h3 className="text-lg font-semibold group-hover:text-[var(--primary)] transition-colors">
          {theme.metadata.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
          {theme.metadata.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <FiBook className="w-4 h-4" />
            {theme.lectures.length} {theme.lectures.length === 1 ? 'lecture' : 'lectures'}
          </span>
        </div>
        <DifficultyBadge min={difficultyRange.min} max={difficultyRange.max} />
      </div>

      {theme.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {theme.metadata.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function getDifficultyRange(lectures: LectureMetadata[]): { min: string; max: string } {
  const difficulties = lectures.map(l => l.difficulty);
  return {
    min: difficulties.includes('beginner') ? 'Beginner' : difficulties.includes('intermediate') ? 'Intermediate' : 'Advanced',
    max: difficulties.includes('advanced') ? 'Advanced' : difficulties.includes('intermediate') ? 'Intermediate' : 'Beginner',
  };
}