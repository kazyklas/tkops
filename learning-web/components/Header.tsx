'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBookOpen, FiPlusCircle } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <FiBookOpen className="w-5 h-5" />
          <span>LearnHub</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/request"
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/request' 
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
                : 'hover:bg-[var(--muted)]'
            }`}
          >
            <FiPlusCircle className="w-4 h-4" />
            <span>Request Topic</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}