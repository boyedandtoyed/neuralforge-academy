'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CourseProgressBadge from '@/components/progress/CourseProgressBadge';

const phases = [
  {
    slug: 'introduction',
    title: 'Introduction',
    lessonSlugs: ['00-setup', '01-history-biology', '02-probability', '03-matrix-ops'],
    icon: '⚡',
    phase: 0,
    description: 'Python setup, neural history, probability, and matrix fundamentals.',
  },
  {
    slug: 'neuron-model',
    title: 'Neuron Model & Architectures',
    lessonSlugs: ['04-single-neuron', '05-activation-fns', '06-network-topology'],
    icon: '🧠',
    phase: 1,
    description: 'From artificial neurons to activation functions and network design.',
  },
  {
    slug: 'regression',
    title: 'Regression',
    lessonSlugs: ['07-linear-regression', '08-logistic-softmax'],
    icon: '📈',
    phase: 2,
    description: 'Regression, classification, and understanding how models learn from data.',
  },
  {
    slug: 'optimization',
    title: 'Optimization',
    lessonSlugs: ['09-backprop-compgraph', '10-taylor-hessian', '11-optimizers', '12-lr-schedules', '13-gradients-reg'],
    icon: '⚙️',
    phase: 3,
    description: 'Backprop, optimizers, schedules, and the training mechanics behind deep learning.',
  },
  {
    slug: 'cnns',
    title: 'Convolutional Neural Networks',
    lessonSlugs: ['14-convolution', '15-cnn-architectures'],
    icon: '🖼️',
    phase: 4,
    description: 'Convolution, pooling, padding, and the architectures that enable vision systems.',
  },
  {
    slug: 'autoencoders',
    title: 'Autoencoders & VAEs',
    lessonSlugs: ['16-autoencoders', '17-vaes'],
    icon: '🔁',
    phase: 5,
    description: 'Compression, latent spaces, and generative modeling with autoencoders.',
  },
  {
    slug: 'rnns',
    title: 'Recurrent Networks',
    lessonSlugs: ['18-rnns', '19-lstm-gru'],
    icon: '🔄',
    phase: 6,
    description: 'Sequence modeling, memory, and recurrent architectures for time-series data.',
  },
  {
    slug: 'transformers',
    title: 'Transformers',
    lessonSlugs: ['20-embeddings', '21-attention', '22-transformer-arch'],
    icon: '🤖',
    phase: 7,
    description: 'Attention, embeddings, and the architecture behind modern language models.',
  },
  {
    slug: 'generative',
    title: 'Generative Models',
    lessonSlugs: ['23-gans', '24-diffusion'],
    icon: '✨',
    phase: 8,
    description: 'GANs and diffusion models for modern generative AI workflows.',
  },
];

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen">
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),transparent_22%)]" />
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
                  className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
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
                  <Link href="/playground" className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/90 px-8 py-3.5 text-sm text-slate-100 transition hover:border-cyan-400 hover:text-white hover:shadow-lg hover:shadow-cyan-400/20">
                    Open playground
                  </Link>
                </motion.div>
              </motion.div>
            </div>
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
                  {['Live Examples', 'Visual Intuition', 'Code Playground', 'Quiz Feedback'].map((item, index) => (
                    <motion.div
                      key={item}
                      className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.3)' }}
                    >
                      <p className="text-sm font-semibold text-cyan-300">{item}</p>
                      <p className="mt-2 text-sm text-slate-400">
                        {item === 'Live Examples' ? 'Edit Python and see results instantly.' :
                         item === 'Visual Intuition' ? 'Learn from diagrams and interactive math.' :
                         item === 'Code Playground' ? 'Experiment with model code in the browser.' :
                         'Practice and verify concepts with quizzes.'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto max-w-7xl px-6 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-10 text-center"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Curriculum</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Nine phases, one complete ML journey.</h2>
          <p className="mt-4 text-slate-400 mx-auto max-w-2xl text-base leading-7 sm:text-lg">
            Deep learning concepts are paired with clear explanations, live Python examples, and interactive quizzes so every lesson feels practical.
          </p>
        </motion.div>
        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {phases.map((phase, index) => (
            <motion.div
              key={phase.slug}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                href={`/courses/${phase.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-6 transition hover:border-cyan-500/30 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 text-lg shadow-inner shadow-cyan-500/5">
                    {phase.icon}
                  </div>
                  <div className="rounded-full border border-slate-700 bg-slate-950/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                    Phase {phase.phase}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{phase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{phase.description}</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{phase.lessonSlugs.length} lessons</span>
                  <CourseProgressBadge courseSlug={phase.slug} lessonSlugs={phase.lessonSlugs} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

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
            {['Live Python', 'Visual math', 'Auto-graded quizzes'].map((feature, index) => (
              <motion.div
                key={feature}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.3)' }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{feature}</p>
                <p className="mt-4 text-slate-300 leading-7 text-sm sm:text-base">
                  {feature === 'Live Python' ? 'Run and edit NumPy code directly in your browser with no backend.' :
                   feature === 'Visual math' ? 'See equations rendered clearly and learn from interactive visuals.' :
                   'Answer quiz questions as you learn and get instant feedback.'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
