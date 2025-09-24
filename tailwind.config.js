/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
        'display': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'orbitron': ['Orbitron', 'Exo 2', 'Rajdhani', 'Electrolize', 'system-ui', 'sans-serif'],
        'cyber': ['Orbitron', 'Exo 2', 'Rajdhani', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Modern neutral palette
        'neutral': {
          '50': '#fafafa',
          '100': '#f5f5f5',
          '200': '#e5e5e5',
          '300': '#d4d4d4',
          '400': '#a3a3a3',
          '500': '#737373',
          '600': '#525252',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717',
          '950': '#0a0a0a',
        },
        // Modern brand colors
        'brand': {
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '300': '#7dd3fc',
          '400': '#38bdf8',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
          '800': '#075985',
          '900': '#0c4a6e',
          '950': '#082f49',
        },
        // Enhanced game colors
        'game': {
          'primary': '#6366f1',
          'secondary': '#10b981',
          'accent': '#f59e0b',
          'error': '#ef4444',
          'warning': '#f59e0b',
          'success': '#10b981',
          'bg': '#0a0a0a',
          'surface': '#171717',
          'surface-light': '#262626',
        },
        'apple': {
          'bg': '#000000',           // Pure black for modern look
          'card': '#1C1C1E',
          'card-light': '#2C2C2E',
          'primary': '#6366f1',      // Modern indigo
          'secondary': '#10b981',    // Modern emerald  
          'success': '#10b981',
          'warning': '#f59e0b',
          'error': '#ef4444',
          'text': '#ffffff',
          'text-secondary': '#a1a1aa',
          'separator': '#27272a',
        },
        // Enhanced cyber theme colors
        'cyber': {
          'bg': '#000000',              // Pure black
          'surface': '#0a0a0a',         // Near black
          'surface-light': '#171717',   // Neutral-900
          'electric': '#06b6d4',        // Cyan-500
          'neon': '#8b5cf6',            // Violet-500
          'green': '#22c55e',           // Green-500
          'pink': '#ec4899',            // Pink-500
          'yellow': '#eab308',          // Yellow-500
          'text': '#f4f4f5',            // Zinc-100
          'text-muted': '#71717a',      // Zinc-500
        },
        // Modern gradient colors
        'gradient': {
          'from-purple': '#8b5cf6',
          'to-pink': '#ec4899',
          'from-blue': '#3b82f6',
          'to-cyan': '#06b6d4',
          'from-green': '#10b981',
          'to-emerald': '#059669',
        }
      },
      borderRadius: {
        'modern': '16px',
        'modern-lg': '24px',
        'modern-xl': '32px',
        'apple': '12px',
        'apple-lg': '16px',
        'apple-xl': '20px',
      },
      boxShadow: {
        // Modern shadow system
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modern-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'modern-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'modern-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        
        // Apple shadows
        'apple': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'apple-xl': '0 16px 48px rgba(0, 0, 0, 0.20)',
        
        // Enhanced glow effects
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-yellow': '0 0 20px rgba(234, 179, 8, 0.5)',
        
        // Cyber glow effects
        'cyber-glow': '0 0 20px rgba(6, 182, 212, 0.4)',
        'cyber-glow-lg': '0 0 30px rgba(6, 182, 212, 0.5)',
        'neon-glow': '0 0 20px rgba(139, 92, 246, 0.4)',
        'neon-glow-lg': '0 0 30px rgba(139, 92, 246, 0.5)',
      },
      animation: {
        // Modern animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'rotate-in': 'rotateIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'modern': '12px',
        'modern-lg': '20px',
        'modern-xl': '24px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}