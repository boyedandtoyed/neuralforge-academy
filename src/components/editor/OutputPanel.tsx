'use client';

interface OutputPanelProps {
  output: string;
  framework: string;
}

export default function OutputPanel({ output, framework }: OutputPanelProps) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span className="text-sm font-medium text-slate-200">Output</span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-mono"
          style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          {framework}
        </span>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {output ? (
          <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed" style={{ color: '#4ade80' }}>
            {output}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-3 py-12">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <p className="text-sm">Run your code to see output here</p>
          </div>
        )}
      </div>
    </div>
  );
}
