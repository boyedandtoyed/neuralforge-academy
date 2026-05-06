'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CourseProgressBadge from '@/components/progress/CourseProgressBadge';

/* Per-phase gradient / glow configuration (index = phase number) */
const PHASE_COLORS = [
  { border: '#06b6d4', glow: 'rgba(6,182,212,0.18)',   bg: 'rgba(6,182,212,0.04)',   icon: '#67e8f9', badge: 'rgba(6,182,212,0.12)' },   // 0 cyan→teal
  { border: '#8b5cf6', glow: 'rgba(139,92,246,0.18)',  bg: 'rgba(139,92,246,0.04)',  icon: '#c4b5fd', badge: 'rgba(139,92,246,0.12)' },  // 1 violet→purple
  { border: '#f59e0b', glow: 'rgba(245,158,11,0.18)',  bg: 'rgba(245,158,11,0.04)',  icon: '#fcd34d', badge: 'rgba(245,158,11,0.12)' },  // 2 orange→amber
  { border: '#f43f5e', glow: 'rgba(244,63,94,0.18)',   bg: 'rgba(244,63,94,0.04)',   icon: '#fda4af', badge: 'rgba(244,63,94,0.12)' },   // 3 rose→pink
  { border: '#3b82f6', glow: 'rgba(59,130,246,0.18)',  bg: 'rgba(59,130,246,0.04)',  icon: '#93c5fd', badge: 'rgba(59,130,246,0.12)' },  // 4 blue→indigo
  { border: '#10b981', glow: 'rgba(16,185,129,0.18)',  bg: 'rgba(16,185,129,0.04)',  icon: '#6ee7b7', badge: 'rgba(16,185,129,0.12)' },  // 5 green→emerald
  { border: '#e879f9', glow: 'rgba(232,121,249,0.18)', bg: 'rgba(232,121,249,0.04)', icon: '#f0abfc', badge: 'rgba(232,121,249,0.12)' }, // 6 fuchsia→purple
  { border: '#eab308', glow: 'rgba(234,179,8,0.18)',   bg: 'rgba(234,179,8,0.04)',   icon: '#fde047', badge: 'rgba(234,179,8,0.12)' },   // 7 yellow→orange
  { border: '#ef4444', glow: 'rgba(239,68,68,0.18)',   bg: 'rgba(239,68,68,0.04)',   icon: '#fca5a5', badge: 'rgba(239,68,68,0.12)' },   // 8 red→rose
];

const phases = [
  { slug: 'introduction',  title: 'Introduction',                    phase: 0, icon: '🌐', description: 'Python setup, neural history, probability, and matrix fundamentals.' },
  { slug: 'neuron-model',  title: 'Neuron Model & Architectures',    phase: 1, icon: '🧠', lessonSlugs: ['04-single-neuron','05-activation-fns','06-network-topology'], description: 'From artificial neurons to activation functions and network design.' },
  { slug: 'regression',    title: 'Regression',                      phase: 2, icon: '📈', description: 'Regression, classification, and understanding how models learn from data.' },
  { slug: 'optimization',  title: 'Optimization',                    phase: 3, icon: '⚙️',  lessonSlugs: ['09-backprop-compgraph','10-taylor-hessian','11-optimizers','12-lr-schedules','13-gradients-reg'], description: 'Backprop, optimizers, schedules, and the training mechanics behind deep learning.' },
  { slug: 'cnns',          title: 'Convolutional Neural Networks',   phase: 4, icon: '🖼️',  lessonSlugs: ['14-convolution','15-cnn-architectures'], description: 'Convolution, pooling, padding, and the architectures that enable vision systems.' },
  { slug: 'autoencoders',  title: 'Autoencoders & VAEs',             phase: 5, icon: '🔒', description: 'Compression, latent spaces, and generative modeling with autoencoders.' },
  { slug: 'rnns',          title: 'Recurrent Networks',              phase: 6, icon: '🔄', description: 'Sequence modeling, memory, and recurrent architectures for time-series data.' },
  { slug: 'transformers',  title: 'Transformers',                    phase: 7, icon: '⚡', description: 'Attention, embeddings, and the architecture behind modern language models.' },
  { slug: 'generative',    title: 'Generative Models',               phase: 8, icon: '🎨', description: 'GANs and diffusion models for modern generative AI workflows.' },
];

const stats = [
  { value: '25',   label: 'Lessons',    icon: '📚', color: '#00d4c8' },
  { value: '9',    label: 'Phases',     icon: '🧩', color: '#8b5cf6' },
  { value: '100%', label: 'In-Browser', icon: '🌐', color: '#10b981' },
  { value: 'Free', label: 'Forever',    icon: '🎁', color: '#f59e0b' },
];

const techStack = [
  { name: 'Next.js 15',   color: '#e2e8f0', bg: 'rgba(226,232,240,0.08)', category: 'framework' },
  { name: 'React 19',     color: '#61dafb', bg: 'rgba(97,218,251,0.08)',  category: 'framework' },
  { name: 'TypeScript',   color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  category: 'language' },
  { name: 'Pyodide',      color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  category: 'runtime' },
  { name: 'KaTeX',        color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', category: 'rendering' },
  { name: 'TailwindCSS',  color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  category: 'styling' },
  { name: 'D3.js',        color: '#f97316', bg: 'rgba(249,115,22,0.08)',  category: 'viz' },
  { name: 'Three.js',     color: '#10b981', bg: 'rgba(16,185,129,0.08)',  category: 'viz' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,212,200,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_50%_80%,_rgba(245,158,11,0.06),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
          <motion.div
            className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200 shadow-sm shadow-cyan-500/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                Browser-first ML learning with live code and interactive lessons.
              </motion.div>

              <div className="max-w-2xl space-y-6">
                <motion.h1
                  className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl gradient-text-hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Learn machine learning the modern way — with math, code, and interactive lessons.
                </motion.h1>
                <motion.p
                  className="text-lg leading-8 text-slate-300 sm:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  NeuralForge Academy teaches ML from first principles using in-browser Python, KaTeX math, and hands-on quizzes so you can build intuition faster.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/courses/introduction/00-setup" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:shadow-xl hover:shadow-cyan-500/30">
                    Start the course
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/playground" className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/90 px-8 py-3.5 text-sm text-slate-100 transition hover:border-violet-400 hover:text-white hover:shadow-lg hover:shadow-violet-400/20">
                    Open playground
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="grid grid-cols-4 gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/8 bg-slate-900/70 p-3 text-center">
                    <div className="text-lg">{stat.icon}</div>
                    <div className="mt-1 text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Feature card */}
            <motion.div
              className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_32px_120px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-900/80 p-6 shadow-inner shadow-slate-950/40">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Featured path</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Probability & matrices</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Foundational concepts for everything that comes next, with real examples and visual intuition.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Live Examples',    desc: 'Edit Python and see results instantly.',          color: '#00d4c8' },
                    { label: 'Visual Intuition', desc: 'Learn from diagrams and interactive math.',       color: '#8b5cf6' },
                    { label: 'Code Playground',  desc: 'Experiment with model code in the browser.',      color: '#f59e0b' },
                    { label: 'Quiz Feedback',    desc: 'Practice and verify concepts with quizzes.',      color: '#10b981' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: item.color + '44' }}
                    >
                      <p className="text-sm font-semibold" style={{ color: item.color }}>{item.label}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Phases ───────────────────────────────────────────── */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="mb-10 text-center" variants={itemVariants}>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Curriculum</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Nine phases, one complete ML journey.</h2>
          <p className="mt-4 text-slate-400 mx-auto max-w-2xl text-base leading-7 sm:text-lg">
            Deep learning concepts paired with clear explanations, live Python examples, and interactive quizzes.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {phases.map((phase) => {
            const pc = PHASE_COLORS[phase.phase];
            return (
              <motion.div
                key={phase.slug}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  href={`/courses/${phase.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-6 transition"
                  style={{
                    borderLeftColor: pc.border,
                    borderLeftWidth: '3px',
                    background: `linear-gradient(135deg, ${pc.bg} 0%, transparent 60%), rgb(15 23 42 / 0.9)`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${pc.glow}`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg shadow-inner"
                      style={{ background: pc.badge, color: pc.icon }}
                    >
                      {phase.icon}
                    </div>
                    <div
                      className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em]"
                      style={{ borderColor: pc.border + '44', color: pc.icon, background: pc.badge }}
                    >
                      Phase {phase.phase}
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{phase.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{phase.lessonSlugs?.length ?? 0} lessons</span>
                    <CourseProgressBadge courseSlug={phase.slug} lessonSlugs={phase.lessonSlugs ?? []} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ── Tech stack ───────────────────────────────────────── */}
      <motion.section
        className="mx-auto max-w-7xl px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Built with</p>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className="rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition hover:scale-105"
              style={{ color: tech.color, background: tech.bg, borderColor: tech.color + '33' }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </motion.section>

      {/* ── Features ─────────────────────────────────────────── */}
      <motion.section
        className="mx-auto max-w-7xl px-6 pb-24 sm:pb-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-10 shadow-[0_20px_120px_rgba(15,23,42,0.28)]"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { label: 'Live Python',            color: '#00d4c8', desc: 'Run and edit NumPy code directly in your browser with no backend.' },
              { label: 'Visual math',            color: '#8b5cf6', desc: 'See equations rendered clearly and learn from interactive visuals.' },
              { label: 'Auto-graded quizzes',   color: '#f59e0b', desc: 'Answer quiz questions as you learn and get instant feedback.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: feature.color + '44' }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: feature.color }}>{feature.label}</p>
                <p className="mt-4 text-slate-300 leading-7 text-sm sm:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
