import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ReactNode } from 'react';

interface MDXContentProps {
  source: string;
}

const components = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 scroll-mt-20" id={String(children)?.toLowerCase().replace(/\s+/g, '-')}>
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl font-semibold mt-8 mb-3 scroll-mt-20" id={String(children)?.toLowerCase().replace(/\s+/g, '-')}>
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 scroll-mt-20" id={String(children)?.toLowerCase().replace(/\s+/g, '-')}>
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="my-4 leading-7">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  a: ({ href, children, ...props }: { href?: string; children: ReactNode; [key: string]: unknown }) => (
    <a 
      href={href} 
      className="text-[var(--primary)] hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
    <code 
      className="px-1.5 py-0.5 rounded bg-[var(--muted)] text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="my-4 p-4 rounded-lg bg-[var(--muted)] overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-4 pl-4 border-l-4 border-[var(--primary)] italic">
      {children}
    </blockquote>
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-[var(--muted)]">{children}</thead>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-4 py-2 text-left font-semibold border border-[var(--border)]">{children}</th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-4 py-2 border border-[var(--border)]">{children}</td>
  ),
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </div>
  );
}
