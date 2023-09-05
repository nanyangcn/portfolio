/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0078D4',
        secondary: '#181818',
        additional: '#1F1F1F',
        error: '#C7695D',
        'text-primary': '#DADADA',
        'text-secondary': '#8A8A8A',
        'border-primary': '#3A3A3A',
        'border-secondary': '#1F1F1F',
      },
      fontFamily: {
        sans: ['VT323', 'sans-serif'],
        serif: ['VT323', 'serif'],
        mono: ['VT323', 'monospace'],
      },
      keyframes: {
        'type-in': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'type-out': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        'cursor-pulse': {
          '0%': { borderStyle: 'solid' },
          '50%': { borderStyle: 'hidden' },
          '100%': { borderStyle: 'solid' },
        },
        'fade-in': {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': {},
        },
      },
      animation: {
        'type-in': 'type-in var(--type-duration) var(--type-in-delay)'
            + 'steps(var(--type-steps), jump-none) forwards infinite',
        'type-out': 'type-out var(--type-duration) var(--type-out-delay)'
            + 'steps(var(--type-steps), jump-none) backwards infinite',
        'cursor-pulse': 'cursor-pulse 1s linear infinite',
      },
    },
  },
  plugins: [],
};
