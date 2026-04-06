'use client';
import { useState } from 'react';

interface QuizOption {
  label: string;
  correct: boolean;
}

interface QuizBlockProps {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export default function QuizBlock({ question, options, explanation }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
  };

  return (
    <div className="my-8 bg-gray-900 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded">Quiz</span>
      </div>
      <p className="text-white font-medium mb-4">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let cls = 'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ';
          if (!revealed) {
            cls += selected === i
              ? 'border-blue-500 bg-blue-500/10 text-white'
              : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:text-white';
          } else {
            if (opt.correct) cls += 'border-green-500 bg-green-500/10 text-green-300';
            else if (selected === i) cls += 'border-red-500 bg-red-500/10 text-red-300';
            else cls += 'border-gray-700 bg-gray-800 text-gray-500';
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} className={cls}>
              <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt.label}
              {revealed && opt.correct && <span className="ml-2">&#10003;</span>}
              {revealed && !opt.correct && selected === i && <span className="ml-2">&#10007;</span>}
            </button>
          );
        })}
      </div>
      {selected !== null && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Check Answer
        </button>
      )}
      {revealed && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className={`font-semibold ${options[selected!]?.correct ? 'text-green-400' : 'text-red-400'}`}>
              {options[selected!]?.correct ? 'Correct! ' : 'Not quite. '}
            </span>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
