'use client';
import dynamic from 'next/dynamic';
import QuizBlock from './QuizBlock';
import { LessonSection } from '@/lib/lessonData';

const MathBlock = dynamic(() => import('./MathBlock'), { ssr: false });

interface LessonContentProps {
  content: LessonSection[] | undefined;
  lessonTitle: string;
}

export default function LessonContent({ content, lessonTitle }: LessonContentProps) {
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
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

// Simple inline markdown: **bold**, `code`
function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
}
