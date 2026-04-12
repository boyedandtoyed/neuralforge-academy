'use client';
import { useProgressStore } from '@/stores/progressStore';

interface LessonCompletedDotProps {
  lessonKey: string;
}

export default function LessonCompletedDot({ lessonKey }: LessonCompletedDotProps) {
  const completed = useProgressStore((s) => s.lessons[lessonKey]?.completed ?? false);
  if (!completed) return null;

  return (
    <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
