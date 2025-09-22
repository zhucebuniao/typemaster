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
        },
        'apple': {
          'bg': '#000000',
          'card': '#1C1C1E',
          'card-light': '#2C2C2E',
          'primary': '#007AFF',
          'secondary': '#5856D6',
          'success': '#34C759',
          'warning': '#FF9F0A',
          'error': '#FF3B30',
          'text': '#FFFFFF',
          'text-secondary': '#8E8E93',
          'separator': '#3A3A3C',
        }
      },
      borderRadius: {
        'apple': '12px',
        'apple-lg': '16px',
        'apple-xl': '20px',
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'apple-xl': '0 16px 48px rgba(0, 0, 0, 0.20)',
      }
    },
  },
  plugins: [],
}