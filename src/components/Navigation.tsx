'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const onLesson = pathname.startsWith('/courses/') && pathname.split('/').length >= 5;

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        height: '56px',
        background: 'rgba(7,7,28,0.82)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-4">
        {/* Brand mark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-2">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[13px] shrink-0 select-none"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 0 18px rgba(59,130,246,0.35)',
            }}
          >
            N
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-white hidden sm:block">
            NeuralForge{' '}
            <span className="text-slate-500 font-normal">Academy</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          <NavLink href="/" active={pathname === '/'}>Curriculum</NavLink>
          <NavLink href="/playground" active={pathname === '/playground'}>Playground</NavLink>
        </div>

        {/* Right-side actions */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* GitHub — explicit px dimensions on SVG to prevent any blowup */}
          <a
            href="https://github.com/boyedandtoyed/neuralforge-academy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0)' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              style={{ flexShrink: 0, display: 'block' }}
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          {!onLesson && (
            <Link
              href="/courses/introduction/00-setup"
              className="text-sm font-medium text-white px-4 py-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                boxShadow: '0 0 20px rgba(59,130,246,0.3)',
              }}
            >
              Start Free
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white ml-auto p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden px-3 pb-3 space-y-0.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#07071c' }}
        >
          <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>Curriculum</MobileNavLink>
          <MobileNavLink href="/playground" onClick={() => setMobileOpen(false)}>Playground</MobileNavLink>
          <MobileNavLink
            href="https://github.com/boyedandtoyed/neuralforge-academy"
            onClick={() => setMobileOpen(false)}
          >
            GitHub
          </MobileNavLink>
          <div className="pt-2 px-1">
            <Link
              href="/courses/introduction/00-setup"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-sm font-medium text-white py-2.5 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              Start Learning Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-sm rounded-lg transition-colors"
      style={{ color: active ? '#f1f5f9' : '#94a3b8', background: active ? 'rgba(255,255,255,0.07)' : 'transparent' }}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
    >
      {children}
    </Link>
  );
}
