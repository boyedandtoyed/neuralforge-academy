'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useProgressStore } from '@/stores/progressStore';

interface Lesson {
  slug: string;
  title: string;
}

interface LessonLayoutProps {
  courseSlug: string;
  courseTitle: string;
  currentLesson: string;
  lessons: Lesson[];
  children: React.ReactNode;
}

export default function LessonLayout({ courseSlug, courseTitle, currentLesson, lessons, children }: LessonLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentIndex = lessons.findIndex(l => l.slug === currentLesson);
  const prev = lessons[currentIndex - 1];
  const next = lessons[currentIndex + 1];
  const lessonProgress = useProgressStore((s) => s.lessons);

  const completed = lessons.filter(l => lessonProgress[`${courseSlug}/${l.slug}`]?.completed).length;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-gray-900 border-r border-gray-800
        flex flex-col overflow-y-auto z-40 transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-gray-800">
          <Link href={`/courses/${courseSlug}`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            &larr; {courseTitle}
          </Link>
          {completed > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-green-400 font-medium">{completed}</span>/{lessons.length} completed
            </div>
          )}
        </div>
        <nav className="flex-1 p-2">
          {lessons.map((lesson, i) => {
            const key = `${courseSlug}/${lesson.slug}`;
            const isCompleted = lessonProgress[key]?.completed ?? false;
            const isCurrent = currentLesson === lesson.slug;
            return (
              <Link
                key={lesson.slug}
                href={`/courses/${courseSlug}/${lesson.slug}`}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5
                  ${isCurrent
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}
                `}
              >
                <span className="text-xs font-mono text-gray-600 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate flex-1">{lesson.title}</span>
                {isCompleted && (
                  <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden sticky top-14 z-20 bg-gray-950 border-b border-gray-800 px-4 py-2 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-gray-400">Lesson {currentIndex + 1} of {lessons.length}</span>
        </div>

        <article className="max-w-3xl mx-auto px-6 py-12 prose prose-invert prose-blue">
          {children}
        </article>

        {/* Prev/Next navigation */}
        <div className="max-w-3xl mx-auto px-6 pb-16 flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/courses/${courseSlug}/${prev.slug}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-800 hover:border-gray-600 rounded-lg px-4 py-3 flex-1 max-w-xs">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="min-w-0">
                <div className="text-xs text-gray-600">Previous</div>
                <div className="truncate">{prev.title}</div>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/courses/${courseSlug}/${next.slug}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-800 hover:border-gray-600 rounded-lg px-4 py-3 flex-1 max-w-xs justify-end text-right">
              <div className="min-w-0">
                <div className="text-xs text-gray-600">Next</div>
                <div className="truncate">{next.title}</div>
              </div>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
