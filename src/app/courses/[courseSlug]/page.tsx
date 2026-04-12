import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseProgressBadge from '@/components/progress/CourseProgressBadge';
import LessonCompletedDot from '@/components/progress/LessonCompletedDot';

const COURSES: Record<string, {
  title: string;
  description: string;
  lessons: { slug: string; title: string; description: string }[];
}> = {
  introduction: {
    title: 'Introduction',
    description: 'Python setup, neural history, probability foundations, and matrix operations.',
    lessons: [
      { slug: '00-setup', title: 'Python, NumPy & Matplotlib Setup', description: 'Run Python in the browser, explore NumPy arrays, and visualize data.' },
      { slug: '01-history-biology', title: 'History & Biological Neurons', description: 'From McCulloch-Pitts to modern neural networks.' },
      { slug: '02-probability', title: 'Probability & Statistics', description: 'Bayes, distributions, and the math behind uncertainty.' },
      { slug: '03-matrix-ops', title: 'Matrix Operations', description: 'Shapes, broadcasting, multiplication, and gradients for matrices.' },
    ],
  },
  'neuron-model': {
    title: 'Neuron Model & Architectures',
    description: 'Artificial neurons, activation functions, and the structure of neural networks.',
    lessons: [
      { slug: '04-single-neuron', title: 'The Artificial Neuron', description: 'Weighted sums, bias, and the forward pass.' },
      { slug: '05-activation-fns', title: 'Activation / Transfer Functions', description: 'ReLU, sigmoid, GELU, and softmax behavior.' },
      { slug: '06-network-topology', title: 'Network Topology & Architectures', description: 'Depth, width, and the layout of network layers.' },
    ],
  },
  regression: {
    title: 'Regression',
    description: 'Linear and logistic regression using loss, gradients, and optimization.',
    lessons: [
      { slug: '07-linear-regression', title: 'Linear Regression', description: 'Fit lines with MSE, gradients, and analytic solutions.' },
      { slug: '08-logistic-softmax', title: 'Logistic Regression, CrossEntropy & Softmax', description: 'Binary and multiclass classification fundamentals.' },
    ],
  },
  optimization: {
    title: 'Optimization',
    description: 'Backprop, optimizers, learning rate schedules, and regularization.',
    lessons: [
      { slug: '09-backprop-compgraph', title: 'Backpropagation & Computation Graphs', description: 'Reverse-mode autodiff and the chain rule in neural networks.' },
      { slug: '10-taylor-hessian', title: 'Taylor Series, Hessian & Quadratic Surfaces', description: 'Curvature, second-order approximation, and optimization geometry.' },
      { slug: '11-optimizers', title: 'SGD, Momentum, Nesterov, AdaGrad, RMSProp, Adam', description: 'Optimizer behavior and training dynamics.' },
      { slug: '12-lr-schedules', title: 'Learning Rate Schedules & Batch Training', description: 'Warmup, cosine decay, and stable convergence patterns.' },
      { slug: '13-gradients-reg', title: 'Vanishing Gradients & Regularization', description: 'Gradient flow, normalization, and regularization techniques.' },
    ],
  },
  cnns: {
    title: 'Convolutional Neural Networks',
    description: 'Learn convolution, pooling, and the CNN architectures that power vision.',
    lessons: [
      { slug: '14-convolution', title: 'Convolution, Padding, Stride & Pooling', description: 'How convolutional filters process data and reduce dimensions.' },
      { slug: '15-cnn-architectures', title: 'LeNet → AlexNet → VGG → ResNet', description: 'The evolution of modern vision architectures.' },
    ],
  },
  autoencoders: {
    title: 'Autoencoders & VAEs',
    description: 'Compress data into latent representations and generate new samples.',
    lessons: [
      { slug: '16-autoencoders', title: 'Autoencoders', description: 'Encoder-decoder structure and reconstruction loss.' },
      { slug: '17-vaes', title: 'Variational Autoencoders — KL Divergence & ELBO', description: 'Latent sampling with probabilistic encodings.' },
    ],
  },
  rnns: {
    title: 'Recurrent Networks',
    description: 'Sequence models from vanilla RNNs to LSTM and GRU memory cells.',
    lessons: [
      { slug: '18-rnns', title: 'Recurrent Neural Networks', description: 'Recurrent state, BPTT, and temporal dynamics.' },
      { slug: '19-lstm-gru', title: 'LSTM & GRU', description: 'Gating mechanisms for long-term memory.' },
    ],
  },
  transformers: {
    title: 'Transformers',
    description: 'The architecture powering modern large language models.',
    lessons: [
      { slug: '20-embeddings', title: 'Embeddings & Positional Encoding', description: 'Token embeddings and positional signals for transformers.' },
      { slug: '21-attention', title: 'Attention Mechanisms', description: 'Scaled dot-product attention and multi-head design.' },
      { slug: '22-transformer-arch', title: 'Transformer Architecture', description: 'Encoder blocks, layer norm, and residual connections.' },
    ],
  },
  generative: {
    title: 'Generative Models',
    description: 'GANs and diffusion models for modern generative AI.',
    lessons: [
      { slug: '23-gans', title: 'GANs — Generator, Discriminator & Training', description: 'Minimax objectives, training dynamics, and mode collapse.' },
      { slug: '24-diffusion', title: 'Diffusion Models — Forward/Reverse Process & Score Matching', description: 'Noise schedules, reverse denoising, and sampling.' },
    ],
  },
};

interface Props {
  params: { courseSlug: string };
}

export function generateStaticParams() {
  return Object.keys(COURSES).map((courseSlug) => ({ courseSlug }));
}

export default function CoursePage({ params }: Props) {
  const { courseSlug } = params;
  const course = COURSES[courseSlug];
  if (!course) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-sm text-slate-400 transition hover:text-slate-200">&larr; All phases</Link>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-slate-400 leading-7">{course.description}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-4 shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Progress</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">{course.lessons.length}</div>
              <div>
                <p className="text-sm text-slate-400">Lessons in this phase</p>
                <CourseProgressBadge courseSlug={courseSlug} lessonSlugs={course.lessons.map((lesson) => lesson.slug)} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {course.lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={`/courses/${courseSlug}/${lesson.slug}`}
              className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-left transition hover:-translate-y-1 hover:border-sky-500/30 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Lesson {String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-lg font-semibold text-white">{lesson.title}</h2>
                </div>
                <LessonCompletedDot lessonKey={`${courseSlug}/${lesson.slug}`} />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{lesson.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
