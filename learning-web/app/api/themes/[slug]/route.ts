import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const contentDir = path.join(process.cwd(), 'content', 'themes');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const yamlPath = path.join(contentDir, slug, 'theme.yaml');
  
  if (!fs.existsSync(yamlPath)) {
    return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
  }

  const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
  const data = yaml.load(yamlContent) as Record<string, unknown>;
  const lectures = getLecturesForTheme(slug);

  return NextResponse.json({
    slug,
    metadata: {
      slug,
      title: (data?.title as string) || slug,
      description: (data?.description as string) || '',
      tags: (data?.tags as string[]) || [],
      coverImage: (data?.coverImage as string) || '',
    },
    lectures,
  });
}

function getLecturesForTheme(themeSlug: string) {
  const lecturesDir = path.join(contentDir, themeSlug, 'lectures');
  
  if (!fs.existsSync(lecturesDir)) {
    return [];
  }

  const files = fs.readdirSync(lecturesDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .sort();

  return files.map(file => {
    const filePath = path.join(lecturesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    
    const orderMatch = file.match(/^(\d+)-/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;
    const slug = file.replace(/\.mdx?$/, '').replace(/^\d+-/, '');

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      difficulty: data.difficulty || 'beginner',
      estimatedMinutes: data.estimatedMinutes || 10,
      order,
    };
  }).sort((a, b) => a.order - b.order);
}