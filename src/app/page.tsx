import Link from 'next/link';

const phases = [
  {
    slug: 'introduction',
    title: 'Introduction',
    lessons: 4,
    icon: '⚡',
    phase: 0,
    description: 'Python & NumPy setup, biological neurons, probability theory, and matrix operations',
  },
  {
    slug: 'neuron-model',
    title: 'Neuron Model & Architectures',
    lessons: 3,
    icon: '🧬',
    phase: 1,
    description: 'The artificial neuron, activation functions (ReLU, GELU, softmax), and network topologies',
  },
  {
    slug: 'regression',
    title: 'Regression',
    lessons: 2,
    icon: '📈',
    phase: 2,
    description: 'Linear regression, logistic regression, cross-entropy loss, and softmax classifier',
  },
  {
    slug: 'optimization',
    title: 'Optimization',
    lessons: 5,
    icon: '∇',
    phase: 3,
    description: 'Backprop, Hessians, SGD → Adam, LR schedules, vanishing gradients & regularization',
  },
  {
    slug: 'cnns',
    title: 'Convolutional Neural Networks',
    lessons: 2,
    icon: '🖼',
    phase: 4,
    description: 'Convolution, pooling, padding/stride, and landmark architectures LeNet → ResNet',
  },
  {
    slug: 'autoencoders',
    title: 'Autoencoders & VAEs',
    lessons: 2,
    icon: '🔁',
    phase: 5,
    description: 'Bottleneck autoencoders, variational autoencoders, ELBO, and the reparameterization trick',
  },
  {
    slug: 'rnns',
    title: 'Recurrent Networks',
    lessons: 2,
    icon: '🔄',
    phase: 6,
    description: 'Sequence modeling, backprop through time, LSTM gating, and GRU',
  },
  {
    slug: 'transformers',
    title: 'Transformers',
    lessons: 3,
    icon: '🤖',
    phase: 7,
    description: 'Positional encodings, scaled dot-product attention, multi-head attention, full architecture',
  },
  {
    slug: 'generative',
    title: 'Generative Models',
    lessons: 2,
    icon: '✨',
    phase: 8,
    description: 'GAN minimax training, mode collapse, DDPM diffusion forward/reverse process & score matching',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-gray-950 to-purple-950/50" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Runs entirely in your browser — no backend required
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">NeuralForge</span>
            <br />
            <span className="text-white">Academy</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Learn machine learning from first principles — every math concept paired with live
            NumPy implementations you can edit and run instantly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses/introduction/00-setup"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Start Learning Free
            </Link>
            <Link
              href="/playground"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Open Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Phases grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">25 Lessons, 9 Phases</h2>
        <p className="text-gray-400 text-center mb-12">
          From Python setup to GANs and diffusion models — every step interactive with KaTeX math and runnable NumPy code.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <Link
              key={phase.slug}
              href={`/courses/${phase.slug}`}
              className="group bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{phase.icon}</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                  Phase {phase.phase} &middot; {phase.lessons} lesson{phase.lessons !== 1 ? 's' : ''}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {phase.title}
              </h3>
              <p className="text-sm text-gray-400">{phase.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech stack badges */}
      <section className="border-t border-gray-800 py-12 px-6">
        <p className="text-center text-gray-500 text-sm mb-6">Powered by</p>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {['Next.js 15', 'React 19', 'TypeScript', 'Pyodide', 'KaTeX', 'TailwindCSS', 'D3.js', 'Three.js'].map(tech => (
            <span key={tech} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
