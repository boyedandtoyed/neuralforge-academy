import Link from 'next/link';
import CourseProgressBadge from '@/components/progress/CourseProgressBadge';

const phases = [
  {
    slug: 'introduction',
    title: 'Introduction',
    phase: 0,
    icon: '⚡',
    lessonSlugs: ['00-setup', '01-history-biology', '02-probability', '03-matrix-ops'],
    description: 'Python & NumPy setup, biological neurons, probability theory, and matrix operations.',
    accent: '#06b6d4',
    accentDim: 'rgba(6,182,212,0.08)',
    accentGlow: 'rgba(6,182,212,0.25)',
  },
  {
    slug: 'neuron-model',
    title: 'Neuron Model & Architectures',
    phase: 1,
    icon: '🧬',
    lessonSlugs: ['04-single-neuron', '05-activation-fns', '06-network-topology'],
    description: 'The artificial neuron, activation functions (ReLU, GELU, softmax), and network topologies.',
    accent: '#10b981',
    accentDim: 'rgba(16,185,129,0.08)',
    accentGlow: 'rgba(16,185,129,0.25)',
  },
  {
    slug: 'regression',
    title: 'Regression',
    phase: 2,
    icon: '📈',
    lessonSlugs: ['07-linear-regression', '08-logistic-softmax'],
    description: 'Linear regression, logistic regression, cross-entropy loss, and softmax classifiers.',
    accent: '#3b82f6',
    accentDim: 'rgba(59,130,246,0.08)',
    accentGlow: 'rgba(59,130,246,0.25)',
  },
  {
    slug: 'optimization',
    title: 'Optimization',
    phase: 3,
    icon: '∇',
    lessonSlugs: ['09-backprop-compgraph', '10-taylor-hessian', '11-optimizers', '12-lr-schedules', '13-gradients-reg'],
    description: 'Backprop, Hessians, SGD → Adam, learning rate schedules, vanishing gradients & regularization.',
    accent: '#f59e0b',
    accentDim: 'rgba(245,158,11,0.08)',
    accentGlow: 'rgba(245,158,11,0.25)',
  },
  {
    slug: 'cnns',
    title: 'Convolutional Neural Networks',
    phase: 4,
    icon: '🖼',
    lessonSlugs: ['14-convolution', '15-cnn-architectures'],
    description: 'Convolution, pooling, padding/stride, and landmark architectures LeNet → ResNet.',
    accent: '#8b5cf6',
    accentDim: 'rgba(139,92,246,0.08)',
    accentGlow: 'rgba(139,92,246,0.25)',
  },
  {
    slug: 'autoencoders',
    title: 'Autoencoders & VAEs',
    phase: 5,
    icon: '🔁',
    lessonSlugs: ['16-autoencoders', '17-vaes'],
    description: 'Bottleneck autoencoders, variational autoencoders, ELBO, and the reparameterization trick.',
    accent: '#f43f5e',
    accentDim: 'rgba(244,63,94,0.08)',
    accentGlow: 'rgba(244,63,94,0.25)',
  },
  {
    slug: 'rnns',
    title: 'Recurrent Networks',
    phase: 6,
    icon: '🔄',
    lessonSlugs: ['18-rnns', '19-lstm-gru'],
    description: 'Sequence modeling, backprop through time, LSTM gating, and GRU.',
    accent: '#f97316',
    accentDim: 'rgba(249,115,22,0.08)',
    accentGlow: 'rgba(249,115,22,0.25)',
  },
  {
    slug: 'transformers',
    title: 'Transformers',
    phase: 7,
    icon: '🤖',
    lessonSlugs: ['20-embeddings', '21-attention', '22-transformer-arch'],
    description: 'Positional encodings, scaled dot-product attention, multi-head attention, full architecture.',
    accent: '#6366f1',
    accentDim: 'rgba(99,102,241,0.08)',
    accentGlow: 'rgba(99,102,241,0.25)',
  },
  {
    slug: 'generative',
    title: 'Generative Models',
    phase: 8,
    icon: '✨',
    lessonSlugs: ['23-gans', '24-diffusion'],
    description: 'GAN minimax training, mode collapse, DDPM diffusion forward/reverse process & score matching.',
    accent: '#d946ef',
    accentDim: 'rgba(217,70,239,0.08)',
    accentGlow: 'rgba(217,70,239,0.25)',
  },
];

const stats = [
  { value: '25', label: 'Lessons' },
  { value: '9', label: 'Phases' },
  { value: '100%', label: 'In-Browser' },
  { value: 'Free', label: 'Forever' },
];

const techStack = [
  { name: 'Next.js 15', color: '#fff' },
  { name: 'React 19', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Pyodide', color: '#ffd43b' },
  { name: 'KaTeX', color: '#1a73e8' },
  { name: 'TailwindCSS', color: '#38bdf8' },
  { name: 'D3.js', color: '#f9a03c' },
  { name: 'Three.js', color: '#049ef4' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-glow relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 right-10 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#93c5fd',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            No backend required — runs entirely in your browser
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            <span className="text-white">Learn ML from</span>
            <br />
            <span className="gradient-text">First Principles</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every math concept explained with LaTeX, then implemented live in your browser.
            No hand-waving — just working code and honest derivations.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {stats.map(s => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="font-bold text-white text-base">{s.value}</span>
                <span className="text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses/introduction/00-setup"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3 rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                boxShadow: '0 0 32px rgba(59,130,246,0.35)',
              }}
            >
              Start Learning Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 rounded-xl transition-all hover:bg-white/5"
              style={{
                color: '#cbd5e1',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Open Playground
            </Link>
          </div>
        </div>
      </section>

      {/* ── Phases grid ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            9 Phases · 25 Lessons
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From Python fundamentals to GANs and diffusion models — every step interactive.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {phases.map(phase => (
            <Link
              key={phase.slug}
              href={`/courses/${phase.slug}`}
              className="surface-card group flex flex-col p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={{ borderTopColor: phase.accent, borderTopWidth: '3px' }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-5">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: phase.accentDim, border: `1px solid ${phase.accent}30` }}
                >
                  {phase.icon}
                </div>

                {/* Phase badge + lesson count */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
                    style={{ color: phase.accent, background: phase.accentDim }}
                  >
                    Phase {phase.phase}
                  </span>
                  <span className="text-[11px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {phase.lessonSlugs.length} {phase.lessonSlugs.length === 1 ? 'lesson' : 'lessons'}
                  </span>
                </div>
              </div>

              {/* Title + progress */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-white text-[15px] leading-snug group-hover:text-blue-300 transition-colors">
                  {phase.title}
                </h3>
                <CourseProgressBadge courseSlug={phase.slug} lessonSlugs={phase.lessonSlugs} />
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed flex-1">{phase.description}</p>

              {/* Footer arrow */}
              <div className="flex items-center gap-1.5 mt-5 text-xs font-medium transition-colors"
                style={{ color: phase.accent }}>
                Open course
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features row ─────────────────────────────────────────── */}
      <section
        className="border-y py-16 px-6"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
      >
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              ),
              color: '#60a5fa',
              title: 'Live Code Editor',
              desc: 'Every lesson has runnable NumPy code. Edit and execute Python via Pyodide WASM — no server.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              ),
              color: '#a78bfa',
              title: 'Proper Math',
              desc: 'Full KaTeX rendering for every equation — no screenshots, no approximations. Real derivations.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              ),
              color: '#34d399',
              title: 'Interactive Visuals',
              desc: 'Gradient descent, loss curves, vector fields — D3 and Three.js visualizations you can play with.',
            },
          ].map(f => (
            <div key={f.title} className="flex gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ color: f.color, background: `${f.color}15`, border: `1px solid ${f.color}25` }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech stack ───────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <p className="text-center text-slate-600 text-xs uppercase tracking-widest mb-6 font-medium">Powered by</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {techStack.map(t => (
            <span
              key={t.name}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                color: t.color,
                background: `${t.color}10`,
                border: `1px solid ${t.color}20`,
              }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
