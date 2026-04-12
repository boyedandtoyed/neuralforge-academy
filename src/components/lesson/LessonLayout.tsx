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
  const currentIndex = lessons.findIndex((l) => l.slug === currentLesson);
  const prev = lessons[currentIndex - 1];
  const next = lessons[currentIndex + 1];
  const lessonProgress = useProgressStore((s) => s.lessons);

  const completed = lessons.filter((l) => lessonProgress[`${courseSlug}/${l.slug}`]?.completed).length;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-slate-800 bg-slate-950/95 p-4 transition-transform duration-200 lg:sticky lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-4 border-b border-slate-800 pb-4">
          <Link href={`/courses/${courseSlug}`} className="text-sm text-slate-400 hover:text-slate-100 transition">
            &larr; {courseTitle}
          </Link>
          <div className="mt-3 text-sm text-slate-400">
            <span className="font-semibold text-sky-300">{completed}</span>/{lessons.length} completed
          </div>
        </div>

        <nav className="space-y-2">
          {lessons.map((lesson, i) => {
            const key = `${courseSlug}/${lesson.slug}`;
            const isCompleted = lessonProgress[key]?.completed ?? false;
            const isCurrent = currentLesson === lesson.slug;
            return (
              <Link
                key={lesson.slug}
                href={`/courses/${courseSlug}/${lesson.slug}`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${isCurrent ? 'bg-slate-900 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-900/80 hover:text-white'}`}
              >
                <span className="w-6 text-right font-mono text-slate-500">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 truncate">{lesson.title}</span>
                {isCompleted && (
                  <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 lg:ml-72">
        <div className="lg:hidden sticky top-14 z-20 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-300 hover:text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm text-slate-400">Lesson {currentIndex + 1}/{lessons.length}</span>
          </div>
        </div>

        <article className="mx-auto max-w-4xl px-6 py-10 prose prose-invert prose-slate">
          {children}
        </article>

        <div className="mx-auto max-w-4xl px-6 pb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <Link href={`/courses/${courseSlug}/${prev.slug}`} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-700 hover:text-white sm:w-auto">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {prev.title}
              </Link>
            ) : <div className="h-12" />}

            {next ? (
              <Link href={`/courses/${courseSlug}/${next.slug}`} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-700 hover:text-white sm:w-auto">
                {next.title}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : <div className="h-12" />}
          </div>
        </div>
      </main>
    </div>
  );
}
