'use client';

interface OutputPanelProps {
  output: string;
  framework: string;
}

export default function OutputPanel({ output, framework }: OutputPanelProps) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
      <div className="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">Output</span>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{framework}</span>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {output ? (
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <span className="text-4xl mb-3">▶</span>
            <p className="text-sm">Run your code to see output here</p>
          </div>
        )}
      </div>
    </div>
  );
}
