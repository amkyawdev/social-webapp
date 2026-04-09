import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-peach': '#ffefd5',
        'pastel-pink': '#ffe4f3',
        'pastel-lavender': '#e7daff',
        'text-dark': '#4e3b4b',
      },
      animation: {
        'pastel-flow': 'pastelFlow 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pastelFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(140, 100, 180, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(140, 100, 180, 0.3), 0 0 60px rgba(140, 100, 180, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
export default config