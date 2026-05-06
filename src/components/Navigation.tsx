'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/courses/introduction', label: 'Courses',    color: '#00d4c8' },
  { href: '/playground',          label: 'Playground', color: '#8b5cf6' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const onLesson = pathname.startsWith('/courses/') && pathname.split('/').length >= 4;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo — multi-color glow */}
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-3xl text-teal-300"
            style={{ background: 'rgba(0,212,200,0.08)', boxShadow: '0 0 24px rgba(0,212,200,0.18), 0 0 48px rgba(139,92,246,0.12)' }}>
            <span className="absolute inset-0 rounded-3xl opacity-60 blur-xl"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,200,0.3), rgba(139,92,246,0.2), rgba(245,158,11,0.1))' }} />
            <svg className="relative h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3L20 8.5L12 14L4 8.5L12 3Z" />
              <path d="M4 15.5L12 21L20 15.5" />
            </svg>
          </span>
          <div className="space-y-0.5 text-left">
            <p className="text-base font-semibold tracking-tight text-white">NeuralForge</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Academy</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href}
                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white">
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full transition-all duration-300 ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
                  style={{ background: item.color }}
                />
              </Link>
            );
          })}

          <a
            href="https://github.com/boyedandtoyed/neuralforge-academy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-300 transition-all duration-200 hover:border-teal-400 hover:text-teal-200 hover:shadow-[0_0_20px_rgba(0,212,200,0.18)]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {!onLesson && (
            <Link
              href="/courses/introduction/00-setup"
              className="text-sm font-medium text-white px-4 py-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
            >
              Start Free
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center rounded-full border border-white/10 bg-slate-900 p-2 text-slate-300 transition hover:border-teal-400 hover:text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle mobile menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:text-white"
                style={{ borderColor: pathname === item.href ? item.color + '44' : undefined }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/boyedandtoyed/neuralforge-academy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:border-teal-400 hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
