import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NeuralForge Academy — Interactive ML from Math to LLMs',
  description: 'Learn machine learning from first principles with live NumPy, TensorFlow, and PyTorch implementations running entirely in your browser.',
  keywords: ['machine learning', 'deep learning', 'interactive', 'tutorial', 'neural networks', 'transformers'],
  openGraph: {
    title: 'NeuralForge Academy',
    description: 'Interactive ML teaching platform — math to LLMs in your browser',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} style={{ background: 'var(--bg-base)', color: '#f1f5f9' }}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
