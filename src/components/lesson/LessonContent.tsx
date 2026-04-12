'use client';
import dynamic from 'next/dynamic';
import QuizBlock from './QuizBlock';
import { LessonSection } from '@/lib/lessonData';
import { useProgressStore } from '@/stores/progressStore';

const MathBlock = dynamic(() => import('./MathBlock'), { ssr: false });

interface Visualizer {
  title: string;
  url: string;
  description: string;
}

const VISUALIZERS: Record<string, Visualizer[]> = {
  'introduction/02-probability': [
    { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', description: 'Beautiful interactive probability & statistics visualizations' },
  ],
  'introduction/03-matrix-ops': [
    { title: 'Matrix Multiplication (matrixmultiplication.xyz)', url: 'http://matrixmultiplication.xyz/', description: 'Step through matrix multiplication visually' },
  ],
  'neuron-model/04-single-neuron': [
    { title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org/', description: 'Train neural nets interactively in your browser' },
  ],
  'neuron-model/06-network-topology': [
    { title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org/', description: 'Experiment with different network architectures live' },
  ],
  'optimization/09-backprop-compgraph': [
    { title: 'Backprop Explainer (distill.pub)', url: 'https://distill.pub/2020/backprop-explainer/', description: 'Visual step-by-step walkthrough of backpropagation' },
  ],
  'optimization/11-optimizers': [
    { title: 'Why Momentum Really Works (distill.pub)', url: 'https://distill.pub/2017/momentum/', description: 'Interactive visual explanation of momentum & optimizer dynamics' },
  ],
  'cnns/14-convolution': [
    { title: 'CNN Explainer', url: 'https://poloclub.github.io/cnn-explainer/', description: 'Interactive visualization of convolutions and feature maps' },
  ],
  'cnns/15-cnn-architectures': [
    { title: 'CNN Explainer', url: 'https://poloclub.github.io/cnn-explainer/', description: 'Explore CNN layers and activations interactively' },
  ],
  'rnns/18-rnns': [
    { title: 'Memorization in RNNs (distill.pub)', url: 'https://distill.pub/2019/memorization-in-rnns/', description: 'Visual exploration of how RNNs store information' },
  ],
  'rnns/19-lstm-gru': [
    { title: 'Memorization in RNNs (distill.pub)', url: 'https://distill.pub/2019/memorization-in-rnns/', description: 'See how LSTM gates control memory over sequences' },
  ],
  'transformers/20-embeddings': [
    { title: 'Embedding Projector', url: 'https://projector.tensorflow.org/', description: 'Explore word embeddings in 3D with PCA / t-SNE' },
  ],
  'transformers/21-attention': [
    { title: 'Transformer Explainer', url: 'https://poloclub.github.io/transformer-explainer/', description: 'Interactive GPT-2 visualization — watch attention heads live' },
    { title: 'LLM Visualization (bbycroft)', url: 'https://bbycroft.net/llm', description: 'Step through transformer inference token-by-token' },
  ],
  'transformers/22-transformer-arch': [
    { title: 'Transformer Explainer', url: 'https://poloclub.github.io/transformer-explainer/', description: 'Interactive GPT-2 — full architecture walkthrough' },
    { title: 'LLM Visualization (bbycroft)', url: 'https://bbycroft.net/llm', description: 'Visual deep-dive into the full transformer stack' },
  ],
  'generative/23-gans': [
    { title: 'GAN Lab', url: 'https://poloclub.github.io/ganlab/', description: 'Train a GAN interactively and watch the generator/discriminator evolve' },
  ],
  'generative/24-diffusion': [
    { title: 'Diffusion Explainer', url: 'https://poloclub.github.io/diffusion-explainer/', description: 'Step through the diffusion denoising process visually' },
  ],
};

interface LessonContentProps {
  content: LessonSection[] | undefined;
  lessonTitle: string;
  lessonKey?: string;
}

export default function LessonContent({ content, lessonTitle, lessonKey }: LessonContentProps) {
  const markComplete = useProgressStore((s) => s.markComplete);
  const completed = useProgressStore((s) =>
    lessonKey ? s.lessons[lessonKey]?.completed ?? false : false
  );
  const quizPassed = useProgressStore((s) =>
    lessonKey ? s.lessons[lessonKey]?.quizPassed ?? false : false
  );
  const visualizers = lessonKey ? (VISUALIZERS[lessonKey] ?? []) : [];

  if (!content) {
    return (
      <div className="py-16 text-center">
        <div className="text-5xl mb-4">&#128679;</div>
        <h1 className="text-2xl font-bold text-white mb-2">{lessonTitle}</h1>
        <p className="text-gray-400">This lesson is coming soon. Check back shortly!</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-8">{lessonTitle}</h1>
      {content.map((section, i) => {
        switch (section.type) {
          case 'prose':
            return (
              <p key={i} className="text-gray-300 leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(section.content ?? '') }}
              />
            );
          case 'heading':
            if (section.level === 2) return <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">{section.content}</h2>;
            if (section.level === 3) return <h3 key={i} className="text-lg font-semibold text-white mt-8 mb-3">{section.content}</h3>;
            return <h4 key={i} className="font-semibold text-white mt-6 mb-2">{section.content}</h4>;
          case 'math':
            return <MathBlock key={i} math={section.content ?? ''} display={section.display} />;
          case 'code':
            return (
              <div key={i} className="my-6 rounded-xl overflow-hidden border border-gray-700">
                <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <span className="text-xs text-gray-400 font-mono">{section.language ?? 'python'}</span>
                  <span className="text-xs text-gray-500">live-editable in Playground &rarr;</span>
                </div>
                <pre className="bg-gray-900 p-4 overflow-x-auto text-sm text-gray-200 font-mono leading-relaxed">
                  <code>{section.content}</code>
                </pre>
              </div>
            );
          case 'quiz':
            return (
              <QuizBlock
                key={i}
                question={section.question ?? ''}
                options={section.options ?? []}
                explanation={section.explanation ?? ''}
                lessonKey={lessonKey}
              />
            );
          default:
            return null;
        }
      })}

      {/* External visualizers */}
      {visualizers.length > 0 && (
        <div className="mt-12 p-6 bg-gray-900 border border-gray-700 rounded-xl">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
            Interactive Visualizers
          </h3>
          <div className="space-y-3">
            {visualizers.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group p-3 rounded-lg border border-gray-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
              >
                <svg className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">{v.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{v.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mark Complete button */}
      {lessonKey && (
        <div className="mt-10 pt-8 border-t border-gray-800 flex items-center gap-4">
          {completed ? (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lesson completed
            </div>
          ) : (
            <button
              onClick={() => markComplete(lessonKey)}
              className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark as Complete
            </button>
          )}
          {quizPassed && !completed && (
            <span className="text-xs text-blue-400">Quiz passed — mark complete when ready</span>
          )}
        </div>
      )}
    </>
  );
}

// Simple inline markdown: **bold**, `code`
function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
}
