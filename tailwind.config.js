/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#ec4899",
          light: "#f472b6",
          dark: "#db2777",
        },
        dark: {
          DEFAULT: "#0f172a",
          lighter: "#1e293b",
          light: "#334155",
        },
        light: {
          DEFAULT: "#f8fafc",
          dim: "#e2e8f0",
          dark: "#94a3b8",
        },
        accent: {
          purple: "#a855f7",
          cyan: "#06b6d4",
          amber: "#f59e0b",
          emerald: "#10b981",
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'matrix': 'matrix 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shine': 'shine 2s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        matrix: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT)',
          },
          '50%': { 
            boxShadow: '0 0 20px theme(colors.primary.DEFAULT), 0 0 40px theme(colors.primary.DEFAULT)',
          },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 15px theme(colors.primary.DEFAULT)',
        'glow-lg': '0 0 30px theme(colors.primary.DEFAULT)',
        'inner-glow': 'inset 0 0 15px theme(colors.primary.DEFAULT)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

