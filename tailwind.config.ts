import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0a0f1e',
          surface: '#0f1729',
          card: 'rgba(255, 255, 255, 0.06)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          accent: 'rgba(0, 212, 200, 0.35)',
        },
        teal: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#00d4c8',
          700: '#0b9488',
        },
        amber: {
          500: '#f59e0b',
        },
      },
      boxShadow: {
        glow: '0 25px 80px rgba(0, 212, 200, 0.15)',
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
