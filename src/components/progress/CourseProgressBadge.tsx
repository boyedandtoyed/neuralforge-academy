'use client';
import { useEffect, useState } from 'react';
import { useProgressStore } from '@/stores/progressStore';

interface CourseProgressBadgeProps {
  courseSlug: string;
  lessonSlugs: string[];
}

export default function CourseProgressBadge({ courseSlug, lessonSlugs }: CourseProgressBadgeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const completed = useProgressStore((s) =>
    lessonSlugs.reduce((count, slug) => count + (s.lessons[`${courseSlug}/${slug}`]?.completed ? 1 : 0), 0)
  );
  const total = lessonSlugs.length;

  if (!mounted || completed === 0) return null;

  const isDone = completed === total;
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isDone ? 'bg-emerald-500/15 text-emerald-300' : 'bg-sky-500/15 text-sky-300'}`}>
      {isDone ? '✓ ' : ''}{completed}/{total} done
    </span>
  );
}
