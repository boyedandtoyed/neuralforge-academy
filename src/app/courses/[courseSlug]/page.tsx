import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseProgressBadge from '@/components/progress/CourseProgressBadge';
import LessonCompletedDot from '@/components/progress/LessonCompletedDot';

const COURSES: Record<string, {
  title: string;
  description: string;
  accent: string;
  lessons: { slug: string; title: string; description: string }[];
}> = {
  'introduction': {
    title: 'Introduction',
    accent: '#06b6d4',
    description: 'Python environment setup, the history of neural networks, probability fundamentals, and the matrix operations that underpin every ML computation.',
    lessons: [
      { slug: '00-setup',           title: 'Python, NumPy & Matplotlib Setup',              description: 'Pyodide in-browser Python, NumPy arrays, broadcasting, z-score normalization' },
      { slug: '01-history-biology', title: 'History & Biological Neurons',                   description: 'McCulloch-Pitts (1943), Rosenblatt perceptron (1958), AI winters, AlexNet (2012)' },
      { slug: '02-probability',     title: 'Probability & Statistics',                        description: 'Bayes theorem, MLE, CLT, KL divergence, Gaussian distribution' },
      { slug: '03-matrix-ops',      title: 'Matrix Operations',                               description: 'Shapes, broadcasting, eigendecomposition, gradient rules for matrices' },
    ],
  },
  'neuron-model': {
    title: 'Neuron Model & Architectures',
    accent: '#10b981',
    description: 'The artificial neuron from first principles, every major activation function, and how neurons are arranged into networks.',
    lessons: [
      { slug: '04-single-neuron',    title: 'The Artificial Neuron',                         description: 'Weighted sum, bias, forward pass, He initialization' },
      { slug: '05-activation-fns',   title: 'Activation / Transfer Functions',               description: 'ReLU, sigmoid, tanh, GELU, softmax, dying ReLU problem' },
      { slug: '06-network-topology', title: 'Network Topology & Architectures',              description: 'Feedforward, depth vs width, MLP parameter count' },
    ],
  },
  'regression': {
    title: 'Regression',
    accent: '#3b82f6',
    description: 'Supervised learning fundamentals — from ordinary least squares to logistic regression and cross-entropy.',
    lessons: [
      { slug: '07-linear-regression', title: 'Linear Regression',                            description: 'MSE loss, normal equation, R², gradient descent vs closed form' },
      { slug: '08-logistic-softmax',  title: 'Logistic Regression, CrossEntropy & Softmax',  description: 'Sigmoid, binary cross-entropy, gradient derivation, softmax multiclass' },
    ],
  },
  'optimization': {
    title: 'Optimization',
    accent: '#f59e0b',
    description: 'Everything about training neural networks: backprop, curvature, optimizers, learning rate schedules, and regularization.',
    lessons: [
      { slug: '09-backprop-compgraph', title: 'Backpropagation & Computation Graphs',        description: 'Reverse-mode autodiff, DAG, chain rule, XOR from scratch' },
      { slug: '10-taylor-hessian',     title: 'Taylor Series, Hessian & Quadratic Surfaces', description: 'Second-order expansion, curvature, Newton\'s method' },
      { slug: '11-optimizers',         title: 'SGD, Momentum, Nesterov, AdaGrad, RMSProp, Adam', description: 'Every major optimizer compared on Rosenbrock function' },
      { slug: '12-lr-schedules',       title: 'Learning Rate Schedules & Batch Training',    description: 'Step, cosine, warmup schedules; batch size and gradient noise' },
      { slug: '13-gradients-reg',      title: 'Vanishing Gradients & Regularization',        description: 'Sigmoid saturation, He init, L1/L2 regularization, batch norm' },
    ],
  },
  'cnns': {
    title: 'Convolutional Neural Networks',
    accent: '#8b5cf6',
    description: 'The convolution operation and the landmark architectures that made computer vision practical.',
    lessons: [
      { slug: '14-convolution',       title: 'Convolution, Padding, Stride & Pooling',       description: 'Sliding filter, output size formula, Sobel edge detection, max pool' },
      { slug: '15-cnn-architectures', title: 'LeNet → AlexNet → VGG → ResNet',               description: 'Architecture evolution, parameter counts, residual skip connections' },
    ],
  },
  'autoencoders': {
    title: 'Autoencoders & VAEs',
    accent: '#f43f5e',
    description: 'Unsupervised representation learning — compressing data into latent codes and sampling new examples.',
    lessons: [
      { slug: '16-autoencoders', title: 'Autoencoders',                                       description: 'Encoder-decoder, bottleneck, reconstruction loss, denoising' },
      { slug: '17-vaes',         title: 'Variational Autoencoders — KL Divergence & ELBO',   description: 'ELBO objective, KL divergence, reparameterization trick' },
    ],
  },
  'rnns': {
    title: 'Recurrent Networks',
    accent: '#f97316',
    description: 'Sequence modeling with recurrent architectures — from vanilla RNNs to LSTM and GRU.',
    lessons: [
      { slug: '18-rnns',     title: 'Recurrent Neural Networks',                              description: 'Hidden state recurrence, BPTT, vanishing gradient in RNNs' },
      { slug: '19-lstm-gru', title: 'LSTM & GRU',                                             description: 'Cell state, forget/input/output gates, GRU update and reset gates' },
    ],
  },
  'transformers': {
    title: 'Transformers',
    accent: '#6366f1',
    description: 'The architecture behind GPT, BERT, and every modern LLM — from embeddings to the full encoder-decoder stack.',
    lessons: [
      { slug: '20-embeddings',       title: 'Embeddings & Positional Encoding',               description: 'Token embeddings, sinusoidal PE, why transformers need explicit position' },
      { slug: '21-attention',        title: 'Attention Mechanisms',                            description: 'Scaled dot-product attention, multi-head, causal masking' },
      { slug: '22-transformer-arch', title: 'Transformer Architecture',                        description: 'FFN, LayerNorm, residual connections, Pre-LN vs Post-LN' },
    ],
  },
  'generative': {
    title: 'Generative Models',
    accent: '#d946ef',
    description: 'State-of-the-art generative modeling — GANs and diffusion models that power modern image synthesis.',
    lessons: [
      { slug: '23-gans',      title: 'GANs — Generator, Discriminator & Training',            description: 'Minimax objective, mode collapse, Wasserstein distance' },
      { slug: '24-diffusion', title: 'Diffusion Models — Forward/Reverse Process & Score Matching', description: 'DDPM, noise schedule, denoising objective, score matching' },
    ],
  },
};

interface Props {
  params: Promise<{ courseSlug: string }>;
}

export function generateStaticParams() {
  return Object.keys(COURSES).map(courseSlug => ({ courseSlug }));
}

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const course = COURSES[courseSlug];
  if (!course) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All Phases
      </Link>

      {/* Course header */}
      <div
        className="rounded-2xl p-7 mb-8"
        style={{
          background: `${course.accent}0a`,
          border: `1px solid ${course.accent}25`,
          borderTopWidth: '3px',
          borderTopColor: course.accent,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-white">{course.title}</h1>
          <CourseProgressBadge courseSlug={courseSlug} lessonSlugs={course.lessons.map(l => l.slug)} />
        </div>
        <p className="text-slate-400 leading-relaxed">{course.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ color: course.accent, background: `${course.accent}15` }}
          >
            {course.lessons.length} {course.lessons.length === 1 ? 'lesson' : 'lessons'}
          </span>
        </div>
      </div>

      {/* Lesson list */}
      <div className="space-y-2.5">
        {course.lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/courses/${courseSlug}/${lesson.slug}`}
            className="group flex items-center gap-4 rounded-xl p-4 transition-all"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Number */}
            <span
              className="text-xl font-bold w-9 shrink-0 text-right tabular-nums transition-colors"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Divider */}
            <div className="w-px h-10 shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-200 group-hover:text-white transition-colors text-sm leading-snug mb-0.5">
                {lesson.title}
              </h2>
              <p className="text-xs text-slate-500 truncate">{lesson.description}</p>
            </div>

            {/* Completion + arrow */}
            <div className="flex items-center gap-2 shrink-0">
              <LessonCompletedDot lessonKey={`${courseSlug}/${lesson.slug}`} />
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-slate-600 group-hover:text-slate-300 transition-colors"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
