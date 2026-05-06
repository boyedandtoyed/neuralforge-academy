'use client';
import { useState } from 'react';
import { useProgressStore } from '@/stores/progressStore';

interface QuizOption {
  label: string;
  correct: boolean;
}

interface QuizBlockProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  lessonKey?: string;
}

export default function QuizBlock({ question, options, explanation, lessonKey }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const markQuizPassed = useProgressStore((s) => s.markQuizPassed);

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
  };

  const handleCheck = () => {
    setRevealed(true);
    const isCorrect = selected !== null && options[selected]?.correct;
    if (isCorrect && lessonKey) markQuizPassed(lessonKey);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-amber-500/20 bg-slate-900/90">
      {/* Amber header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-amber-500/20 bg-amber-500/5">
        <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Quiz</span>
        <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="p-5">
        <p className="text-white font-medium mb-4 leading-7">{question}</p>
        <div className="space-y-2">
          {options.map((opt, i) => {
            let cls = 'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ';
            if (!revealed) {
              cls += selected === i
                ? 'border-amber-500/60 bg-amber-500/10 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white';
            } else {
              if (opt.correct) {
                cls += 'border-emerald-500 bg-emerald-500/10 text-emerald-200 shadow-[0_0_14px_rgba(16,185,129,0.25)]';
              } else if (selected === i) {
                cls += 'border-rose-500 bg-rose-500/10 text-rose-300';
              } else {
                cls += 'border-slate-700 bg-slate-800/60 text-slate-600';
              }
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} className={cls}>
                <span className="font-mono mr-2 text-slate-500">{String.fromCharCode(65 + i)}.</span>
                {opt.label}
                {revealed && opt.correct && <span className="ml-2 text-emerald-400">✓</span>}
                {revealed && !opt.correct && selected === i && <span className="ml-2 text-rose-400">✗</span>}
              </button>
            );
          })}
        </div>

        {selected !== null && !revealed && (
          <button
            onClick={handleCheck}
            className="mt-4 text-sm font-semibold px-5 py-2 rounded-lg text-slate-950 transition-all hover:scale-105 active:scale-95 animate-gradient-shift"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316, #f59e0b)', backgroundSize: '200% 200%' }}
          >
            Check Answer
          </button>
        )}

        {revealed && (
          <div className="mt-4 p-4 rounded-lg border border-slate-700 bg-slate-950/80">
            <p className="text-sm text-slate-300 leading-6">
              <span className={`font-semibold ${options[selected!]?.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                {options[selected!]?.correct ? 'Correct! ' : 'Not quite. '}
              </span>
              {explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
