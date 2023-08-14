/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#0078D4',
      secondary: '#181818',
      additional: '#1F1F1F',
      error: '#C7695D',
      'text-primary': '#DADADA',
      'text-secondary': '#8A8A8A',
      'border-primary': '#3A3A3A',
      'border-secondary': '#1F1F1F',
    },
  },
  plugins: [],
};
