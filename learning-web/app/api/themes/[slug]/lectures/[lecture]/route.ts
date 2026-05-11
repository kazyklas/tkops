import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'themes');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; lecture: string }> }
) {
  const { slug, lecture } = await params;
  const lectureData = getLecture(slug, lecture);
  
  if (!lectureData) {
    return NextResponse.json({ error: 'Lecture not found' }, { status: 404 });
  }
  
  const adjacent = getAdjacentLectures(slug, lecture);
  
  return NextResponse.json({
    ...lectureData,
    adjacent,
  });
}

function getLecture(themeSlug: string, lectureSlug: string) {
  const lecturesDir = path.join(contentDir, themeSlug, 'lectures');
  
  if (!fs.existsSync(lecturesDir)) {
    return null;
  }

  const files = fs.readdirSync(lecturesDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  const targetFile = files.find(file => {
    const slug = file.replace(/\.mdx?$/, '').replace(/^\d+-/, '');
    return slug === lectureSlug;
  });

  if (!targetFile) {
    return null;
  }

  const filePath = path.join(lecturesDir, targetFile);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug: lectureSlug,
    metadata: {
      slug: lectureSlug,
      title: data.title || lectureSlug,
      description: data.description || '',
      difficulty: data.difficulty || 'beginner',
      estimatedMinutes: data.estimatedMinutes || 10,
    },
    content,
  };
}

function getAdjacentLectures(themeSlug: string, lectureSlug: string) {
  const lecturesDir = path.join(contentDir, themeSlug, 'lectures');
  
  if (!fs.existsSync(lecturesDir)) {
    return { prev: null, next: null };
  }

  const files = fs.readdirSync(lecturesDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .sort();

  const lectures = files.map(file => {
    const fileContent = fs.readFileSync(path.join(lecturesDir, file), 'utf-8');
    const { data } = matter(fileContent);
    const orderMatch = file.match(/^(\d+)-/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;
    const slug = file.replace(/\.mdx?$/, '').replace(/^\d+-/, '');
    return {
      slug,
      title: data.title || slug,
      order,
    };
  }).sort((a, b) => a.order - b.order);

  const currentIndex = lectures.findIndex(l => l.slug === lectureSlug);

  return {
    prev: currentIndex > 0 ? lectures[currentIndex - 1] : null,
    next: currentIndex < lectures.length - 1 ? lectures[currentIndex + 1] : null,
  };
}