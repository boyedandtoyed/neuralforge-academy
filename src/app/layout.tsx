import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'NeuralForge Academy — Interactive ML from Math to LLMs',
  description: 'Learn machine learning from first principles with live Python and interactive math in the browser.',
  keywords: ['machine learning', 'deep learning', 'interactive', 'tutorial', 'neural networks'],
  openGraph: {
    title: 'NeuralForge Academy',
    description: 'Browser-first ML curriculum with interactive lessons, live Python, and quizzes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} font-body bg-bg-base text-white antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
