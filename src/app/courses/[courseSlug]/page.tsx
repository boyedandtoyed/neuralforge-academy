import Link from 'next/link';
import { notFound } from 'next/navigation';

const COURSES: Record<string, { title: string; description: string; lessons: { slug: string; title: string; description: string }[] }> = {
  'math-foundations': {
    title: 'Math Foundations',
    description: 'Build the mathematical intuition behind every ML algorithm — vectors, calculus, probability, and optimization.',
    lessons: [
      { slug: '01-vectors-matrices', title: 'Vectors & Matrices', description: 'Dot products, matrix multiplication, linear transformations' },
      { slug: '02-derivatives-gradients', title: 'Derivatives & Gradients', description: 'Chain rule, partial derivatives, Jacobians, directional derivatives' },
      { slug: '03-probability-stats', title: 'Probability & Statistics', description: 'Distributions, expectation, MLE, Bayes theorem' },
      { slug: '04-gradient-descent', title: 'Gradient Descent', description: 'SGD, momentum, Adam — optimizing loss functions step by step' },
    ],
  },
  'ml-fundamentals': {
    title: 'ML Fundamentals',
    description: 'Core supervised learning algorithms, model evaluation, and the bias-variance tradeoff.',
    lessons: [
      { slug: '05-linear-regression', title: 'Linear Regression', description: 'Ordinary least squares, normal equation, closed-form solution' },
      { slug: '06-logistic-regression', title: 'Logistic Regression', description: 'Sigmoid, cross-entropy loss, decision boundaries' },
      { slug: '07-model-evaluation', title: 'Model Evaluation', description: 'Precision, recall, ROC curves, cross-validation' },
      { slug: '08-bias-variance', title: 'Bias-Variance Tradeoff', description: 'Overfitting, regularization, L1/L2 penalties' },
    ],
  },
  'classical-ml': {
    title: 'Classical ML',
    description: 'Decision trees, SVMs, ensemble methods, and dimensionality reduction.',
    lessons: [
      { slug: '09-decision-trees', title: 'Decision Trees', description: 'Information gain, Gini impurity, pruning' },
      { slug: '10-svms', title: 'Support Vector Machines', description: 'Margin maximization, kernel trick, soft margin' },
      { slug: '11-clustering', title: 'Clustering', description: 'K-means, DBSCAN, hierarchical clustering' },
      { slug: '12-dimensionality-reduction', title: 'Dimensionality Reduction', description: 'PCA, t-SNE, UMAP — visualizing high-dimensional data' },
    ],
  },
  'deep-learning': {
    title: 'Deep Learning',
    description: 'Neural networks from scratch — forward pass, backpropagation, CNNs, and sequence models.',
    lessons: [
      { slug: '13-neural-networks', title: 'Neural Networks', description: 'Perceptrons, activation functions, universal approximation' },
      { slug: '14-backpropagation', title: 'Backpropagation', description: 'Compute graphs, chain rule, from-scratch NumPy implementation' },
      { slug: '15-cnns', title: 'Convolutional Neural Networks', description: 'Convolution, pooling, ResNet, image classification' },
      { slug: '16-rnns-lstm', title: 'RNNs & LSTM', description: 'Sequence modeling, vanishing gradients, gated architectures' },
    ],
  },
  'transformers-llms': {
    title: 'Transformers & LLMs',
    description: 'The full transformer architecture — from attention to building and fine-tuning LLMs.',
    lessons: [
      { slug: '17-attention', title: 'Attention Mechanism', description: 'Scaled dot-product attention, multi-head attention, positional encoding' },
      { slug: '18-transformer-arch', title: 'Transformer Architecture', description: 'Encoder-decoder, layer norm, feed-forward blocks' },
      { slug: '19-bert', title: 'BERT & Masked LM', description: 'Pre-training, fine-tuning, sentence embeddings' },
      { slug: '20-gpt', title: 'GPT & Autoregressive LMs', description: 'Causal attention, generation strategies, scaling laws' },
      { slug: '21-rlhf', title: 'RLHF & Alignment', description: 'Reward modeling, PPO, DPO, Constitutional AI' },
      { slug: '22-rag', title: 'RAG & Retrieval', description: 'Vector search, chunking, hybrid retrieval, re-ranking' },
      { slug: '23-agents', title: 'LLM Agents', description: 'Tool use, ReAct, function calling, multi-agent systems' },
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
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">&larr; All Courses</Link>
        <h1 className="text-4xl font-bold mt-4 mb-3 text-white">{course.title}</h1>
        <p className="text-gray-400 text-lg">{course.description}</p>
      </div>
      <div className="space-y-3">
        {course.lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/courses/${courseSlug}/${lesson.slug}`}
            className="group flex items-center gap-4 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-xl p-5 transition-all hover:shadow-lg hover:shadow-blue-500/10"
          >
            <span className="text-2xl font-bold text-gray-600 group-hover:text-blue-500 transition-colors w-8 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{lesson.title}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{lesson.description}</p>
            </div>
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </main>
  );
}
