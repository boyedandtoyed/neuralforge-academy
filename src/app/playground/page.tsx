'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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
    <main className="min-h-screen bg-gray-950 p-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-white">ML Playground</h1>
          <p className="text-gray-400 text-sm mt-1">Write and run NumPy, TensorFlow.js, or PyTorch code live in your browser</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MultiFrameworkEditor />
        </motion.div>
      </motion.div>
    </main>
  );
}
