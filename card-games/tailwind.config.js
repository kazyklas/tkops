export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: 'var(--color-base)',
        mantle: 'var(--color-mantle)',
        crust: 'var(--color-crust)',
        surface0: 'var(--color-surface0)',
        surface1: 'var(--color-surface1)',
        surface2: 'var(--color-surface2)',
        overlay0: 'var(--color-overlay0)',
        overlay1: 'var(--color-overlay1)',
        overlay2: 'var(--color-overlay2)',
        text: 'var(--color-text)',
        subtext0: 'var(--color-subtext0)',
        subtext1: 'var(--color-subtext1)',
        rosewater: 'var(--color-rosewater)',
        flamingo: 'var(--color-flamingo)',
        pink: 'var(--color-pink)',
        mauve: 'var(--color-mauve)',
        red: 'var(--color-red)',
        maroon: 'var(--color-maroon)',
        peach: 'var(--color-peach)',
        yellow: 'var(--color-yellow)',
        green: 'var(--color-green)',
        teal: 'var(--color-teal)',
        sky: 'var(--color-sky)',
        sapphire: 'var(--color-sapphire)',
        blue: 'var(--color-blue)',
        lavender: 'var(--color-lavender)',
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}
