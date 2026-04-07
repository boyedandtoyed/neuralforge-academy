'use client';
import dynamic from 'next/dynamic';

const MultiFrameworkEditor = dynamic(
  () => import('@/components/editor/MultiFrameworkEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm gap-2">
        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
        Loading editor…
      </div>
    ),
  }
);

export default function PlaygroundPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">ML Playground</h1>
          <p className="text-sm mt-1 text-slate-400">
            Write and run NumPy, TensorFlow.js, or PyTorch-syntax code live in your browser — no server required.
          </p>
        </div>
        <MultiFrameworkEditor />
      </div>
    </main>
  );
}
