'use client';

import { useEffect, useState } from 'react';
import { FiList } from 'react-icons/fi';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!content) return;

    const extractedHeadings: Heading[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24">
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
              className={`block py-1 transition-colors ${
                activeId === heading.id
                  ? 'text-[var(--primary)] font-medium'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
