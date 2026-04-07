'use client';
import { useProgressStore } from '@/stores/progressStore';

interface CourseProgressBadgeProps {
  courseSlug: string;
  lessonSlugs: string[];
}

export default function CourseProgressBadge({ courseSlug, lessonSlugs }: CourseProgressBadgeProps) {
  // Select primitives separately to avoid new object reference on every render (which causes infinite re-renders)
  const completed = useProgressStore((s) => s.getCourseProgress(courseSlug, lessonSlugs).completed);
  const total = useProgressStore((s) => s.getCourseProgress(courseSlug, lessonSlugs).total);
  if (completed === 0) return null;

  const allDone = completed === total;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${allDone ? 'bg-green-500/15 text-green-400' : 'bg-blue-500/15 text-blue-400'}`}>
      {allDone ? '✓ ' : ''}{completed}/{total} done
    </span>
  );
}
