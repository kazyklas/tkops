import Link from 'next/link';
import { FiClock, FiCheckCircle } from 'react-icons/fi';

interface LectureMetadata {
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  order: number;
}

interface DifficultyBadgeProps {
  difficulty: string;
}

function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const colors = {
    beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  }[difficulty] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
}

interface LectureItemProps {
  themeSlug: string;
  lecture: LectureMetadata;
  isCompleted?: boolean;
  index: number;
}

export function LectureItem({ themeSlug, lecture, isCompleted, index }: LectureItemProps) {
  return (
    <Link
      href={`/themes/${themeSlug}/lectures/${lecture.slug}`}
      className="group flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] hover:shadow-sm transition-all"
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--muted)] text-sm font-medium">
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium group-hover:text-[var(--primary)] transition-colors truncate">
          {lecture.title}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5" />
            {lecture.estimatedMinutes} min
          </span>
          <DifficultyBadge difficulty={lecture.difficulty} />
        </div>
      </div>

      {isCompleted && (
        <FiCheckCircle className="flex-shrink-0 w-5 h-5 text-emerald-500" />
      )}
    </Link>
  );
}