'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getIcon = () => {
    if (theme === 'light') return <FiSun className="w-4 h-4" />;
    if (theme === 'dark') return <FiMoon className="w-4 h-4" />;
    return <FiMonitor className="w-4 h-4" />;
  };

  const getLabel = () => {
    if (theme === 'light') return 'Light';
    if (theme === 'dark') return 'Dark';
    return 'System';
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--muted)] hover:bg-[var(--border)] transition-colors text-sm font-medium"
      aria-label={`Current theme: ${getLabel()}. Click to change.`}
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </button>
  );
}
