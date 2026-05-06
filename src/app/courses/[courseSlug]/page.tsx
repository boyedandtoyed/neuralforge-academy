import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseProgressBadge from '@/components/progress/CourseProgressBadge';
import LessonCompletedDot from '@/components/progress/LessonCompletedDot';

const SLUG_TO_PHASE: Record<string, number> = {
  introduction:   0,
  'neuron-model': 1,
  regression:     2,
  optimization:   3,
  cnns:           4,
  autoencoders:   5,
  rnns:           6,
  transformers:   7,
  generative:     8,
};

const PHASE_COLORS = [
  { border: '#06b6d4', glow: 'rgba(6,182,212,0.18)',   badge: '#67e8f9',  bg: 'rgba(6,182,212,0.05)',  progress: 'from-cyan-400 to-teal-500' },
  { border: '#8b5cf6', glow: 'rgba(139,92,246,0.18)',  badge: '#c4b5fd',  bg: 'rgba(139,92,246,0.05)', progress: 'from-violet-500 to-purple-600' },
  { border: '#f59e0b', glow: 'rgba(245,158,11,0.18)',  badge: '#fcd34d',  bg: 'rgba(245,158,11,0.05)', progress: 'from-orange-400 to-amber-500' },
  { border: '#f43f5e', glow: 'rgba(244,63,94,0.18)',   badge: '#fda4af',  bg: 'rgba(244,63,94,0.05)',  progress: 'from-rose-500 to-pink-500' },
  { border: '#3b82f6', glow: 'rgba(59,130,246,0.18)',  badge: '#93c5fd',  bg: 'rgba(59,130,246,0.05)', progress: 'from-blue-500 to-indigo-600' },
  { border: '#10b981', glow: 'rgba(16,185,129,0.18)',  badge: '#6ee7b7',  bg: 'rgba(16,185,129,0.05)', progress: 'from-green-400 to-emerald-500' },
  { border: '#e879f9', glow: 'rgba(232,121,249,0.18)', badge: '#f0abfc',  bg: 'rgba(232,121,249,0.05)',progress: 'from-fuchsia-500 to-purple-600' },
  { border: '#eab308', glow: 'rgba(234,179,8,0.18)',   badge: '#fde047',  bg: 'rgba(234,179,8,0.05)',  progress: 'from-yellow-400 to-orange-500' },
  { border: '#ef4444', glow: 'rgba(239,68,68,0.18)',   badge: '#fca5a5',  bg: 'rgba(239,68,68,0.05)',  progress: 'from-red-500 to-rose-500' },
];

const COURSES: Record<string, {
  title: string;
  description: string;
  lessons: { slug: string; title: string; description: string }[];
}> = {
  introduction: {
    title: 'Introduction',
    description: 'Python setup, neural history, probability foundations, and matrix operations.',
    lessons: [
      { slug: '00-setup',           title: 'Python, NumPy & Matplotlib Setup',            description: 'Run Python in the browser, explore NumPy arrays, and visualize data.' },
      { slug: '01-history-biology', title: 'History & Biological Neurons',                description: 'From McCulloch-Pitts to modern neural networks.' },
      { slug: '02-probability',     title: 'Probability & Statistics',                    description: 'Bayes, distributions, and the math behind uncertainty.' },
      { slug: '03-matrix-ops',      title: 'Matrix Operations',                           description: 'Shapes, broadcasting, multiplication, and gradients for matrices.' },
    ],
  },
  'neuron-model': {
    title: 'Neuron Model & Architectures',
    description: 'Artificial neurons, activation functions, and the structure of neural networks.',
    lessons: [
      { slug: '04-single-neuron',    title: 'The Artificial Neuron',                description: 'Weighted sums, bias, and the forward pass.' },
      { slug: '05-activation-fns',   title: 'Activation / Transfer Functions',      description: 'ReLU, sigmoid, GELU, and softmax behavior.' },
      { slug: '06-network-topology', title: 'Network Topology & Architectures',     description: 'Depth, width, and the layout of network layers.' },
    ],
  },
  regression: {
    title: 'Regression',
    description: 'Linear and logistic regression using loss, gradients, and optimization.',
    lessons: [
      { slug: '07-linear-regression', title: 'Linear Regression',                                    description: 'Fit lines with MSE, gradients, and analytic solutions.' },
      { slug: '08-logistic-softmax',  title: 'Logistic Regression, CrossEntropy & Softmax',          description: 'Binary and multiclass classification fundamentals.' },
    ],
  },
  optimization: {
    title: 'Optimization',
    description: 'Backprop, optimizers, learning rate schedules, and regularization.',
    lessons: [
      { slug: '09-backprop-compgraph', title: 'Backpropagation & Computation Graphs',                     description: 'Reverse-mode autodiff and the chain rule in neural networks.' },
      { slug: '10-taylor-hessian',     title: 'Taylor Series, Hessian & Quadratic Surfaces',              description: 'Curvature, second-order approximation, and optimization geometry.' },
      { slug: '11-optimizers',         title: 'SGD, Momentum, Nesterov, AdaGrad, RMSProp, Adam',          description: 'Optimizer behavior and training dynamics.' },
      { slug: '12-lr-schedules',       title: 'Learning Rate Schedules & Batch Training',                 description: 'Warmup, cosine decay, and stable convergence patterns.' },
      { slug: '13-gradients-reg',      title: 'Vanishing Gradients & Regularization',                     description: 'Gradient flow, normalization, and regularization techniques.' },
    ],
  },
  cnns: {
    title: 'Convolutional Neural Networks',
    description: 'Learn convolution, pooling, and the CNN architectures that power vision.',
    lessons: [
      { slug: '14-convolution',       title: 'Convolution, Padding, Stride & Pooling', description: 'How convolutional filters process data and reduce dimensions.' },
      { slug: '15-cnn-architectures', title: 'LeNet → AlexNet → VGG → ResNet',         description: 'The evolution of modern vision architectures.' },
    ],
  },
  autoencoders: {
    title: 'Autoencoders & VAEs',
    description: 'Compress data into latent representations and generate new samples.',
    lessons: [
      { slug: '16-autoencoders', title: 'Autoencoders',                                       description: 'Encoder-decoder structure and reconstruction loss.' },
      { slug: '17-vaes',         title: 'Variational Autoencoders — KL Divergence & ELBO',    description: 'Latent sampling with probabilistic encodings.' },
    ],
  },
  rnns: {
    title: 'Recurrent Networks',
    description: 'Sequence models from vanilla RNNs to LSTM and GRU memory cells.',
    lessons: [
      { slug: '18-rnns',     title: 'Recurrent Neural Networks', description: 'Recurrent state, BPTT, and temporal dynamics.' },
      { slug: '19-lstm-gru', title: 'LSTM & GRU',               description: 'Gating mechanisms for long-term memory.' },
    ],
  },
  transformers: {
    title: 'Transformers',
    description: 'The architecture powering modern large language models.',
    lessons: [
      { slug: '20-embeddings',       title: 'Embeddings & Positional Encoding', description: 'Token embeddings and positional signals for transformers.' },
      { slug: '21-attention',        title: 'Attention Mechanisms',             description: 'Scaled dot-product attention and multi-head design.' },
      { slug: '22-transformer-arch', title: 'Transformer Architecture',         description: 'Encoder blocks, layer norm, and residual connections.' },
    ],
  },
  generative: {
    title: 'Generative Models',
    description: 'GANs and diffusion models for modern generative AI.',
    lessons: [
      { slug: '23-gans',      title: 'GANs — Generator, Discriminator & Training',                        description: 'Minimax objectives, training dynamics, and mode collapse.' },
      { slug: '24-diffusion', title: 'Diffusion Models — Forward/Reverse Process & Score Matching',       description: 'Noise schedules, reverse denoising, and sampling.' },
    ],
  },
};

interface Props {
  params: Promise<{ courseSlug: string }>;
}

export function generateStaticParams() {
  return Object.keys(COURSES).map((courseSlug) => ({ courseSlug }));
}

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const course = COURSES[courseSlug];
  if (!course) notFound();

  const phaseNum = SLUG_TO_PHASE[courseSlug] ?? 0;
  const pc = PHASE_COLORS[phaseNum];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-sm text-slate-400 transition hover:text-slate-200">&larr; All phases</Link>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-slate-400 leading-7">{course.description}</p>
          </div>

          {/* Progress badge */}
          <div
            className="rounded-3xl border px-6 py-4 shadow-[0_25px_80px_rgba(15,23,42,0.25)] shrink-0"
            style={{ borderColor: pc.border + '44', background: `linear-gradient(135deg, ${pc.bg}, rgba(15,23,42,0.9))` }}
          >
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: pc.badge }}>Progress</p>
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold"
                style={{ background: pc.bg, color: pc.badge }}
              >
                {course.lessons.length}
              </div>
              <div>
                <p className="text-sm text-slate-400">Lessons in this phase</p>
                <CourseProgressBadge courseSlug={courseSlug} lessonSlugs={course.lessons.map((l) => l.slug)} />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson grid — CSS-variable hover glow (no JS event handlers) */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson.slug}
              className="phase-hover-card rounded-3xl"
              style={{ '--phase-glow': pc.glow } as React.CSSProperties}
            >
              <Link
                href={`/courses/${courseSlug}/${lesson.slug}`}
                className="group flex flex-col h-full overflow-hidden rounded-3xl border bg-slate-900/80 p-6 text-left transition-colors duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.08)', borderLeftColor: pc.border, borderLeftWidth: '3px' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Lesson {String(index + 1).padStart(2, '0')}</p>
                    <h2 className="mt-3 text-lg font-semibold text-white leading-6">{lesson.title}</h2>
                  </div>
                  <LessonCompletedDot lessonKey={`${courseSlug}/${lesson.slug}`} />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">{lesson.description}</p>
                <div
                  className="mt-4 inline-flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: pc.badge }}
                >
                  Start lesson →
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
