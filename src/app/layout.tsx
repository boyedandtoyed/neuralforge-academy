import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NeuralForge Academy — Interactive ML from Math to LLMs',
  description: 'Learn machine learning from first principles with live TensorFlow, PyTorch, and NumPy implementations running in your browser.',
  keywords: ['machine learning', 'deep learning', 'interactive', 'tutorial', 'neural networks'],
  openGraph: {
    title: 'NeuralForge Academy',
    description: 'Interactive ML teaching platform — math to LLMs in your browser',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
