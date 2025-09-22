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
        'orbitron': ['Orbitron', 'system-ui', 'sans-serif'],
        'cyber': ['Orbitron', 'Exo 2', 'system-ui', 'sans-serif'],
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
          'bg': '#0d1117',           // GitHub-style darker charcoal
          'card': '#1C1C1E',
          'card-light': '#2C2C2E',
          'primary': '#00f5ff',      // Electric blue (cyber neon)
          'secondary': '#b967ff',    // Neon purple
          'success': '#34C759',
          'warning': '#FF9F0A',
          'error': '#FF3B30',
          'text': '#FFFFFF',
          'text-secondary': '#8E8E93',
          'separator': '#3A3A3C',
        },
        // Modern cyber theme colors
        'cyber': {
          'bg': '#0d1117',
          'surface': '#161b22',
          'card': '#21262d',
          'border': '#30363d',
          'electric': '#00f5ff',
          'neon': '#b967ff',
          'green': '#39ff14',
          'orange': '#ff8c00',
          'red': '#ff073a',
          'text': '#f0f6fc',
          'text-muted': '#7d8590',
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
        // Cyber glow effects
        'cyber-glow': '0 0 20px rgba(0, 245, 255, 0.3)',
        'cyber-glow-lg': '0 0 30px rgba(0, 245, 255, 0.4)',
        'neon-glow': '0 0 20px rgba(185, 103, 255, 0.3)',
        'neon-glow-lg': '0 0 30px rgba(185, 103, 255, 0.4)',
        'green-glow': '0 0 20px rgba(57, 255, 20, 0.3)',
        'orange-glow': '0 0 20px rgba(255, 140, 0, 0.3)',
        'red-glow': '0 0 20px rgba(255, 7, 58, 0.3)',
      }
    },
  },
  plugins: [],
}