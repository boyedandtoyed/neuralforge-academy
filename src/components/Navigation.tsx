'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const courses = [
  { slug: 'math-foundations', title: 'Math Foundations' },
  { slug: 'ml-fundamentals', title: 'ML Fundamentals' },
  { slug: 'classical-ml', title: 'Classical ML' },
  { slug: 'deep-learning', title: 'Deep Learning' },
  { slug: 'transformers-llms', title: 'Transformers & LLMs' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          <span className="gradient-text">NeuralForge</span>
          <span className="text-gray-400 font-normal text-sm ml-1">Academy</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setCoursesOpen(o => !o)}
              className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              Courses
              <svg className={`w-3 h-3 transition-transform ${coursesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {coursesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1 z-50">
                {courses.map(c => (
                  <Link
                    key={c.slug}
                    href={`/courses/${c.slug}`}
                    onClick={() => setCoursesOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/playground"
            className={`text-sm transition-colors ${pathname === '/playground' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
          >
            Playground
          </Link>
          <a
            href="https://github.com/boyedandtoyed/neuralforge-academy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-3 space-y-3">
          {courses.map(c => (
            <Link key={c.slug} href={`/courses/${c.slug}`} onClick={() => setMobileOpen(false)}
              className="block text-sm text-gray-300 hover:text-white py-1">
              {c.title}
            </Link>
          ))}
          <Link href="/playground" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-300 hover:text-white py-1">Playground</Link>
          <a href="https://github.com/boyedandtoyed/neuralforge-academy" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white py-1">GitHub</a>
        </div>
      )}
    </nav>
  );
}
