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
  const progressPct = lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0;

  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside
        className={`
          fixed lg:sticky top-[56px] left-0 h-[calc(100vh-56px)] flex flex-col z-40
          transition-transform duration-200 overflow-y-auto w-64
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Sidebar header */}
        <div className="p-4 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-3"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {courseTitle}
          </Link>

          {/* Progress bar */}
          {completed > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-slate-500">Progress</span>
                <span className="text-[11px] font-medium" style={{ color: '#4ade80' }}>
                  {completed}/{lessons.length} done
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPct}%`,
                    background: 'linear-gradient(90deg, #22c55e, #16a34a)',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Lesson list */}
        <nav className="flex-1 p-2 space-y-0.5">
          {lessons.map((lesson, i) => {
            const key = `${courseSlug}/${lesson.slug}`;
            const isCompleted = lessonProgress[key]?.completed ?? false;
            const isCurrent = currentLesson === lesson.slug;

            return (
              <Link
                key={lesson.slug}
                href={`/courses/${courseSlug}/${lesson.slug}`}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: isCurrent ? 'rgba(59,130,246,0.15)' : 'transparent',
                  border: isCurrent ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                  color: isCurrent ? '#93c5fd' : isCompleted ? '#86efac' : '#94a3b8',
                }}
              >
                {/* Number or check */}
                <span
                  className="text-[11px] font-mono shrink-0 w-5 text-center"
                  style={{ color: isCurrent ? '#60a5fa' : isCompleted ? '#4ade80' : 'rgba(255,255,255,0.2)' }}
                >
                  {isCompleted ? '✓' : String(i + 1).padStart(2, '0')}
                </span>

                <span className="truncate text-[13px] leading-snug flex-1">{lesson.title}</span>

                {isCurrent && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: '#3b82f6' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div
          className="lg:hidden sticky top-[56px] z-20 px-4 py-2 flex items-center gap-3"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Open lesson list"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-slate-400">
            Lesson {currentIndex + 1} <span className="text-slate-600">of {lessons.length}</span>
          </span>
        </div>

        {/* Article */}
        <article className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 lesson-body">
          {children}
        </article>

        {/* Prev / Next navigation */}
        <div
          className="max-w-3xl mx-auto w-full px-6 pb-16 flex items-center justify-between gap-4"
        >
          {prev ? (
            <Link
              href={`/courses/${courseSlug}/${prev.slug}`}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 flex-1 max-w-xs transition-all hover:-translate-x-0.5"
              style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-600 group-hover:text-slate-300 transition-colors">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-600 mb-0.5">Previous</div>
                <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">{prev.title}</div>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/courses/${courseSlug}/${next.slug}`}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 flex-1 max-w-xs text-right justify-end transition-all hover:translate-x-0.5"
              style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="min-w-0">
                <div className="text-[11px] text-slate-600 mb-0.5">Next</div>
                <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">{next.title}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-600 group-hover:text-slate-300 transition-colors">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
