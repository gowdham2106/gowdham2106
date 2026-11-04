/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#02040a',
          900: '#050914',
          850: '#080d1e',
          800: '#0d162d',
          700: '#142245',
          600: '#1e3366',
          border: 'rgba(0, 243, 255, 0.25)',
          'border-pink': 'rgba(255, 0, 127, 0.25)',
        },
        neon: {
          cyan: '#00f3ff',
          blue: '#0066ff',
          purple: '#8b00ff',
          magenta: '#ff007f',
          pink: '#ff2a85',
          amber: '#ffaa00',
          green: '#00ff66',
        }
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        tech: ['"Share Tech Mono"', 'monospace'],
        display: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 243, 255, 0.45), 0 0 30px rgba(0, 243, 255, 0.2)',
        'neon-magenta': '0 0 15px rgba(255, 0, 127, 0.45), 0 0 30px rgba(255, 0, 127, 0.2)',
        'neon-purple': '0 0 15px rgba(139, 0, 255, 0.45), 0 0 30px rgba(139, 0, 255, 0.2)',
        'cyber-box': '0 0 25px rgba(0, 243, 255, 0.15), inset 0 0 15px rgba(0, 243, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 2s infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

