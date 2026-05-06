'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const pct = lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-slate-800 bg-slate-950/95 p-4 transition-transform duration-200 lg:sticky lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        initial={{ x: -288 }}
        animate={{ x: sidebarOpen ? 0 : -288 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="mb-4 border-b border-slate-800 pb-4">
          <Link href={`/courses/${courseSlug}`} className="text-sm text-slate-400 hover:text-slate-100 transition">
            &larr; {courseTitle}
          </Link>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Progress</span>
              <span className="text-xs font-semibold text-emerald-400">{completed}/{lessons.length} done</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #00d4c8, #8b5cf6)',
                }}
              />
            </div>
          </div>
        </div>

        <motion.nav
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {lessons.map((lesson, i) => {
            const key = `${courseSlug}/${lesson.slug}`;
            const isCompleted = lessonProgress[key]?.completed ?? false;
            const isCurrent = currentLesson === lesson.slug;

            return (
              <motion.div
                key={lesson.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  href={`/courses/${courseSlug}/${lesson.slug}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all ${
                    isCurrent
                      ? 'bg-slate-900 text-white border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-900/80 hover:text-white border border-transparent'
                  }`}
                  style={isCurrent ? { borderLeftColor: '#00d4c8', borderLeftWidth: '3px', paddingLeft: '10px' } : {}}
                >
                  <span className="w-6 shrink-0 text-right font-mono text-slate-500 text-xs">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 truncate">{lesson.title}</span>
                  {isCompleted && (
                    <motion.svg
                      className="ml-auto h-4 w-4 shrink-0 text-emerald-400 animate-emerald-glow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </motion.aside>

      {/* Main */}
      <motion.main
        className="flex-1 min-w-0 lg:ml-72"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile top bar */}
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

        <motion.article
          className="mx-auto max-w-4xl px-6 py-10 prose prose-invert prose-slate"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.article>

        {/* Prev / Next navigation */}
        <motion.div
          className="mx-auto max-w-4xl px-6 pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/courses/${courseSlug}/${prev.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-500/40 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10 sm:w-auto">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {prev.title}
                </Link>
              </motion.div>
            ) : <div className="h-12" />}

            {next ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/courses/${courseSlug}/${next.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-violet-500/40 hover:text-white hover:shadow-lg hover:shadow-violet-500/10 sm:w-auto">
                  {next.title}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ) : <div className="h-12" />}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
