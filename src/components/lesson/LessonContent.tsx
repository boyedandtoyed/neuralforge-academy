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
  const lessonCompleted = useProgressStore((s) => lessonKey ? (s.lessons[lessonKey]?.completed ?? false) : false);
  const quizPassed = useProgressStore((s) => lessonKey ? (s.lessons[lessonKey]?.quizPassed ?? false) : false);
  const visualizers = lessonKey ? (VISUALIZERS[lessonKey] ?? []) : [];

  if (!content) {
    return (
      <div className="py-20 text-center">
        <div className="text-5xl mb-5">🚧</div>
        <h1 className="text-2xl font-bold text-white mb-3">{lessonTitle}</h1>
        <p className="text-slate-400">This lesson is coming soon. Check back shortly!</p>
      </div>
    );
  }

  return (
    <>
      {/* Lesson title */}
      <h1 className="text-3xl font-bold text-white mb-8 leading-tight">{lessonTitle}</h1>

      {/* Content sections */}
      {content.map((section, i) => {
        switch (section.type) {
          case 'prose':
            return (
              <p
                key={i}
                className="text-slate-300 leading-[1.8] mb-5 text-[15px]"
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(section.content ?? '') }}
              />
            );

          case 'heading':
            if (section.level === 2)
              return (
                <h2
                  key={i}
                  className="text-xl font-bold text-white mt-12 mb-4 pb-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {section.content}
                </h2>
              );
            if (section.level === 3)
              return <h3 key={i} className="text-lg font-semibold text-white mt-8 mb-3">{section.content}</h3>;
            return <h4 key={i} className="font-semibold text-slate-200 mt-6 mb-2">{section.content}</h4>;

          case 'math':
            return <MathBlock key={i} math={section.content ?? ''} display={section.display} />;

          case 'code':
            return (
              <div key={i} className="my-7 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ background: '#11112a', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="text-xs font-medium font-mono px-2 py-0.5 rounded"
                    style={{ color: '#93c5fd', background: 'rgba(59,130,246,0.12)' }}>
                    {section.language ?? 'python'}
                  </span>
                  <span className="text-xs text-slate-600">editable in Playground →</span>
                </div>
                <pre className="p-5 overflow-x-auto text-sm leading-relaxed"
                  style={{ background: '#090916', color: '#e2e8f0', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
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
        <div
          className="mt-12 p-6 rounded-2xl"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#a78bfa' }}>
            Interactive Visualizers
          </h3>
          <div className="space-y-2.5">
            {visualizers.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group p-3 rounded-xl transition-all"
                style={{ border: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.04)' }}
              >
                <svg
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="mt-0.5 shrink-0" style={{ color: '#a78bfa' }}
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{v.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{v.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mark Complete */}
      {lessonKey && (
        <div className="mt-12 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {lessonCompleted ? (
            <div className="flex items-center gap-2.5 text-sm font-medium" style={{ color: '#4ade80' }}>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Lesson completed
            </div>
          ) : (
            <button
              onClick={() => markComplete(lessonKey)}
              className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                boxShadow: '0 0 20px rgba(22,163,74,0.3)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Mark as Complete
            </button>
          )}
          {quizPassed && !lessonCompleted && (
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              Quiz passed — mark complete when ready
            </span>
          )}
        </div>
      )}
    </>
  );
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f1f5f9;font-weight:600">$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(59,130,246,0.1);color:#93c5fd;padding:2px 6px;border-radius:4px;font-size:0.85em;font-family:\'JetBrains Mono\',monospace;border:1px solid rgba(59,130,246,0.18)">$1</code>');
}
