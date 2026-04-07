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
    if (isCorrect && lessonKey) {
      markQuizPassed(lessonKey);
    }
  };

  return (
    <div
      className="my-8 rounded-2xl p-6"
      style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
          style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.15)' }}
        >
          Quiz
        </span>
      </div>

      <p className="text-white font-medium mb-4 leading-relaxed">{question}</p>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.03)';
          let borderColor = 'rgba(255,255,255,0.08)';
          let textColor = '#94a3b8';

          if (!revealed) {
            if (selected === i) {
              bg = 'rgba(59,130,246,0.1)';
              borderColor = 'rgba(59,130,246,0.4)';
              textColor = '#e2e8f0';
            }
          } else {
            if (opt.correct) {
              bg = 'rgba(34,197,94,0.08)';
              borderColor = 'rgba(34,197,94,0.35)';
              textColor = '#86efac';
            } else if (selected === i) {
              bg = 'rgba(239,68,68,0.08)';
              borderColor = 'rgba(239,68,68,0.35)';
              textColor = '#fca5a5';
            } else {
              textColor = '#475569';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 disabled:cursor-default"
              style={{ background: bg, border: `1px solid ${borderColor}`, color: textColor }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors"
                style={{
                  background: !revealed && selected === i ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                  color: !revealed && selected === i ? '#60a5fa' : 'rgba(255,255,255,0.3)',
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt.label}</span>
              {revealed && opt.correct && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {revealed && !opt.correct && selected === i && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Check button */}
      {selected !== null && !revealed && (
        <button
          onClick={handleCheck}
          className="mt-4 text-sm font-medium text-white px-5 py-2 rounded-xl transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 0 16px rgba(59,130,246,0.25)' }}
        >
          Check Answer
        </button>
      )}

      {/* Explanation */}
      {revealed && (
        <div
          className="mt-4 p-4 rounded-xl text-sm leading-relaxed"
          style={{
            background: options[selected!]?.correct ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
            border: `1px solid ${options[selected!]?.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
          }}
        >
          <span
            className="font-semibold mr-1.5"
            style={{ color: options[selected!]?.correct ? '#4ade80' : '#f87171' }}
          >
            {options[selected!]?.correct ? 'Correct!' : 'Not quite.'}
          </span>
          <span className="text-slate-300">{explanation}</span>
        </div>
      )}
    </div>
  );
}
