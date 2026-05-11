'use client';

import { useState } from 'react';
import { FiChevronLeft, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

interface FormData {
  title: string;
  description: string;
  difficulty: string;
  name: string;
  email: string;
}

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

export default function RequestPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    difficulty: 'all',
    name: '',
    email: '',
  });
  const [status, setStatus] = useState<SubmitStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/request-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setStatus({
        type: 'success',
        message: 'Your topic request has been submitted successfully!',
      });
      setFormData({
        title: '',
        description: '',
        difficulty: 'all',
        name: '',
        email: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Request a Topic</h1>
        <p className="text-[var(--muted-foreground)]">
          Don&apos;t see a topic you want? Request it and we&apos;ll consider adding it.
        </p>
      </header>

      {status && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          status.type === 'success' 
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
            : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
        }`}>
          {status.type === 'success' ? (
            <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Topic Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            placeholder="e.g., Python for Data Science"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description / Why it would be useful <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
            placeholder="Describe what you'd like to learn and why it would be valuable..."
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
            Suggested Difficulty Level <span className="text-rose-500">*</span>
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name or Alias (optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Your Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-lg font-medium bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}