import Link from 'next/link';

const courses = [
  { slug: 'math-foundations', title: 'Math Foundations', lessons: 4, icon: '∑', description: 'Vectors, matrices, derivatives, probability, gradient descent' },
  { slug: 'ml-fundamentals', title: 'ML Fundamentals', lessons: 4, icon: '📊', description: 'Linear/logistic regression, model evaluation, bias-variance' },
  { slug: 'classical-ml', title: 'Classical ML', lessons: 4, icon: '🌳', description: 'Decision trees, SVMs, clustering, PCA, t-SNE, UMAP' },
  { slug: 'deep-learning', title: 'Deep Learning', lessons: 4, icon: '🧠', description: 'Neural networks, backprop, CNNs, RNNs, LSTM, GRU' },
  { slug: 'transformers-llms', title: 'Transformers & LLMs', lessons: 7, icon: '🤖', description: 'Attention, BERT, GPT, RLHF, RAG, agents, safety' },
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
            TensorFlow.js, PyTorch-syntax, and NumPy implementations you can edit and run instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/math-foundations/01-vectors-matrices"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Start Learning Free
            </Link>
            <Link href="/playground"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-8 py-3 rounded-lg transition-colors">
              Open Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">23 Lessons, 5 Phases</h2>
        <p className="text-gray-400 text-center mb-12">From linear algebra to building your own LLM — every step interactive.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <Link key={course.slug} href={`/courses/${course.slug}`}
              className="group bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{course.icon}</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                  Phase {i} · {course.lessons} lessons
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-400">{course.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech stack badges */}
      <section className="border-t border-gray-800 py-12 px-6">
        <p className="text-center text-gray-500 text-sm mb-6">Powered by</p>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {['Next.js 15', 'React 19', 'TypeScript', 'Pyodide', 'TensorFlow.js', 'D3.js', 'Three.js', 'KaTeX'].map(tech => (
            <span key={tech} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
