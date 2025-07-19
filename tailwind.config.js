/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Aceternity 关键帧动画
        beam: {
          '0%, 100%': { opacity: '0', transform: 'scaleY(0)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 5px var(--aceternity-beam-glow, hsl(var(--primary)))',
          },
          '50%': {
            boxShadow:
              '0 0 20px var(--aceternity-beam-glow, hsl(var(--primary))), 0 0 30px var(--aceternity-beam-glow, hsl(var(--primary)))',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Aceternity 动画
        beam: 'beam var(--aceternity-beam-duration, 3s) ease-in-out infinite',
        float: 'float var(--aceternity-float-duration, 0.2s) ease-out',
        'gradient-shift':
          'gradient-shift var(--aceternity-gradient-duration, 4s) linear infinite',
        'pulse-glow':
          'pulse-glow var(--aceternity-pulse-duration, 2s) ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
