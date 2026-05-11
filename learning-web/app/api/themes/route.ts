import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const contentDir = path.join(process.cwd(), 'content', 'themes');

export async function GET() {
  if (!fs.existsSync(contentDir)) {
    return NextResponse.json([]);
  }

  const themeDirs = fs.readdirSync(contentDir);
  
  const themes = themeDirs.map(dir => {
    const yamlPath = path.join(contentDir, dir, 'theme.yaml');
    if (!fs.existsSync(yamlPath)) return null;
    
    const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
    const data = yaml.load(yamlContent) as Record<string, unknown>;
    const lectures = getLecturesForTheme(dir);
    
    return {
      slug: dir,
      metadata: {
        slug: dir,
        title: (data?.title as string) || dir,
        description: (data?.description as string) || '',
        tags: (data?.tags as string[]) || [],
        coverImage: (data?.coverImage as string) || '',
      },
      lectures,
    };
  }).filter(Boolean);

  return NextResponse.json(themes);
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