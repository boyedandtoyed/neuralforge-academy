import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NeuralForge Academy — Interactive ML from Math to LLMs',
  description: 'Learn machine learning from first principles with live Python and interactive math in the browser.',
  keywords: ['machine learning', 'deep learning', 'interactive', 'tutorial', 'neural networks'],
  openGraph: {
    title: 'NeuralForge Academy',
    description: 'Browser-first ML curriculum with interactive lessons, live code, and quizzes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
