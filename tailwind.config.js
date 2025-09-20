/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        'game': {
          'primary': '#3B82F6',
          'secondary': '#10B981',
          'error': '#EF4444',
          'warning': '#F59E0B',
          'bg': '#0F172A',
          'surface': '#1E293B',
        }
      }
    },
  },
  plugins: [],
}