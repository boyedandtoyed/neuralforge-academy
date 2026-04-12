import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
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