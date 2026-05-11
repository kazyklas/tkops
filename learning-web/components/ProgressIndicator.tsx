'use client';

import { useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  themeSlug: string;
  totalLectures: number;
  className?: string;
}

export function ProgressIndicator({ themeSlug, totalLectures, className = '' }: ProgressIndicatorProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`progress-${themeSlug}`);
    if (stored) {
      setCompleted(JSON.parse(stored));
    }
  }, [themeSlug]);

  const progress = totalLectures > 0 ? (completed.length / totalLectures) * 100 : 0;

  return (
    <div className={className}>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-[var(--muted-foreground)]">Progress</span>
        <span className="font-medium">{completed.length}/{totalLectures}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function useLectureProgress(themeSlug: string) {
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`progress-${themeSlug}`);
    if (stored) {
      setCompletedLectures(JSON.parse(stored));
    }
  }, [themeSlug]);

  const isCompleted = (lectureSlug: string) => completedLectures.includes(lectureSlug);

  const toggleCompleted = (lectureSlug: string) => {
    const newCompleted = isCompleted(lectureSlug)
      ? completedLectures.filter(s => s !== lectureSlug)
      : [...completedLectures, lectureSlug];
    
    setCompletedLectures(newCompleted);
    localStorage.setItem(`progress-${themeSlug}`, JSON.stringify(newCompleted));
  };

  return { completedLectures, isCompleted, toggleCompleted };
}
