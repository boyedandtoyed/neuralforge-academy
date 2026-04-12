import Link from 'next/link';
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
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_0_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
                <span className="h-2 w-2 rounded-full bg-sky-300 animate-pulse" />
                Runs entirely in the browser with Pyodide-powered live Python.
              </div>
              <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Build deep learning intuition with interactive math, code, and quizzes.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                NeuralForge Academy merges KaTeX math, live NumPy examples, and guided lessons so you can learn machine learning from first principles without setup.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/courses/introduction/00-setup" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                  Start the course
                </Link>
                <Link href="/playground" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm text-slate-100 transition hover:border-slate-300">
                  Open playground
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Curriculum</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Nine phases, one complete ML journey.</h2>
          <p className="mt-4 text-slate-400 mx-auto max-w-2xl">
            Deep learning concepts are paired with visual explanations, live Python cells, and interactive quizzes so every lesson is hands-on and memorable.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {phases.map((phase) => (
            <Link key={phase.slug} href={`/courses/${phase.slug}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_10px_60px_rgba(15,23,42,0.2)] transition hover:-translate-y-1 hover:border-sky-500/30 hover:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <span className="text-4xl">{phase.icon}</span>
                <span className="rounded-full border border-slate-700 bg-slate-950/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Phase {phase.phase}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{phase.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{phase.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{phase.lessonSlugs.length} lessons</span>
                <CourseProgressBadge courseSlug={phase.slug} lessonSlugs={phase.lessonSlugs} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_20px_120px_rgba(15,23,42,0.25)]">
          <div className="grid gap-8 lg:grid-cols-3">
            {['Live Python', 'Visual math', 'Auto-graded quizzes'].map((feature) => (
              <div key={feature} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">{feature}</p>
                <p className="mt-4 text-slate-300 leading-7">{feature === 'Live Python' ? 'Run and edit NumPy code directly in your browser with no backend.' : feature === 'Visual math' ? 'See equations rendered clearly and learn from interactive visuals.' : 'Answer quiz questions as you learn and get instant feedback.'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
