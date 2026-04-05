'use client';
import dynamic from 'next/dynamic';

const MultiFrameworkEditor = dynamic(
  () => import('@/components/editor/MultiFrameworkEditor'),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-gray-400">Loading editor...</div> }
);

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">ML Playground</h1>
          <p className="text-gray-400 text-sm mt-1">Write and run NumPy, TensorFlow.js, or PyTorch code live in your browser</p>
        </div>
        <MultiFrameworkEditor />
      </div>
    </main>
  );
}
