/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    screens: {
      mobile: '415px',
      md: '618px',
      lg: '1024px',
      xl: '1200px'
    },
    container: {
      center: true
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['var(--font-iowan)']
    },
    keyframes: {
      blink: {
        '0%': { opacity: 0.2 },
        '20%': { opacity: 1 },
        '100% ': { opacity: 0.2 }
      },
      'fade-in-text': {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        to: { opacity: 1, transform: 'none' }
      },
      'fade-up-text': {
        from: { opacity: 0, transform: 'translateY(10px)' },
        to: { opacity: 1, transform: 'none' }
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      'fade-out': {
        from: { opacity: 1 },
        to: { opacity: 0 }
      },
      'drawer-right-show': {
        from: { transform: 'translateX(100%)' },
        to: { transform: 'translateX(0)' }
      },
      'drawer-right-hide': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(100%)' }
      },
      'drawer-left-show': {
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0)' }
      },
      'drawer-left-hide': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' }
      },
      'drawer-bottom-show': {
        from: { transform: 'translateY(100%)' },
        to: { transform: 'translateY(0)' }
      },
      'drawer-bottom-hide': {
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(100%)' }
      },
      'modal-show': {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
      },
      'modal-hide': {
        from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' }
      },
      'slide-up-and-fade': {
        from: { opacity: 0, transform: 'translateY(2px)' },
        to: { opacity: 1, transform: 'none' }
      },
      'slide-down-and-fade': {
        from: { opacity: 0, transform: 'translateY(-2px)' },
        to: { opacity: 1, transform: 'none' }
      },
      'slide-left-and-fade': {
        from: { opacity: 0, transform: 'translateX(2px)' },
        to: { opacity: 1, transform: 'none' }
      },
      'slide-right-and-fade': {
        from: { opacity: 0, transform: 'translateX(-2px)' },
        to: { opacity: 1, transform: 'none' }
      },
      'accordion-slide-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' }
      },
      'accordion-slide-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 }
      },
      'menu-slide-down': {
        from: { height: 0 },
        to: { height: '440px' }
      },
      'menu-slide-up': {
        from: { height: '440px' },
        to: { height: 0 }
      },
      // Menu testing
      enterFromRight: {
        from: { opacity: 0, transform: 'translateX(200px)' },
        to: { opacity: 1, transform: 'translateX(0)' }
      },
      enterFromLeft: {
        from: { opacity: 0, transform: 'translateX(-200px)' },
        to: { opacity: 1, transform: 'translateX(0)' }
      },
      exitToRight: {
        from: { opacity: 1, transform: 'translateX(0)' },
        to: { opacity: 0, transform: 'translateX(200px)' }
      },
      exitToLeft: {
        from: { opacity: 1, transform: 'translateX(0)' },
        to: { opacity: 0, transform: 'translateX(-200px)' }
      },
      scaleIn: {
        from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
        to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' }
      },
      scaleOut: {
        from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 }
      }
    },
    animation: {
      blink: 'blink 1.4s both infinite',
      'fade-in-text': 'fade-in-text 500ms var(--animation-delay, 0ms) ease forwards',
      'fade-up-text': 'fade-up-text 500ms var(--animation-delay, 0ms) ease forwards',
      'modal-show': 'fade-in 1000ms var(--smooth-bezier)',
      'modal-hide': 'fade-out 1000ms var(--smooth-bezier)',
      'drawer-right-show': 'drawer-right-show 1000ms var(--smooth-bezier)',
      'drawer-right-hide': 'drawer-right-hide 1000ms var(--smooth-bezier)',
      'drawer-left-show': 'drawer-left-show 1000ms var(--smooth-bezier)',
      'drawer-left-hide': 'drawer-left-hide 1000ms var(--smooth-bezier)',
      'drawer-bottom-show': 'drawer-bottom-show 1000ms var(--smooth-bezier)',
      'drawer-bottom-hide': 'drawer-bottom-hide 1000ms var(--smooth-bezier)',
      'fade-in': 'fade-in var(--animation-delay, 150ms) ease forwards',
      'fade-out': 'fade-out var(--animation-delay, 150ms) ease',
      'slide-up-and-fade': 'slide-up-and-fade 300ms ease',
      'slide-down-and-fade': 'slide-down-and-fade 300ms ease',
      'slide-left-and-fade': 'slide-left-and-fade 300ms ease',
      'slide-right-and-fade': 'slide-right-and-fade 300ms ease',
      'accordion-slide-down':
        'accordion-slide-down 500ms var(--smooth-bezier), fade-in 300ms var(--smooth-bezier)',

      'accordion-slide-up':
        'accordion-slide-up 500ms var(--smooth-bezier), fade-out 300ms var(--smooth-bezier)',
      'menu-slide-down': 'menu-slide-down 500ms var(--smooth-bezier) forwards',
      'menu-slide-up':
        'menu-slide-up 500ms var(--smooth-bezier), fade-out 1000ms var(--smooth-bezier)',
      // Menu testing
      scaleIn: 'scaleIn 200ms ease',
      scaleOut: 'scaleOut 200ms ease',
      fadeIn: 'fadeIn 200ms ease',
      fadeOut: 'fadeOut 200ms ease',
      enterFromLeft: 'enterFromLeft 250ms ease',
      enterFromRight: 'enterFromRight 250ms ease',
      exitToLeft: 'exitToLeft 250ms ease',
      exitToRight: 'exitToRight 250ms ease'
    },
    extend: {
      fontSize: {
        'heading-2xs': ['16px', { lineHeight: '20px' }],
        'heading-xs': ['20px', { lineHeight: '28px' }],
        'heading-sm': ['28px', { lineHeight: '32px' }],
        'heading-md': ['32px', { lineHeight: '40px' }],
        'heading-lg': ['40px', { lineHeight: '48px' }],
        'heading-xl': ['60px', { lineHeight: '64px' }],
        'heading-2xl': ['80px', { lineHeight: '80px' }],
        'text-xs': ['12px', { lineHeight: '16px' }],
        'text-sm': ['14px', { lineHeight: '20px' }],
        'text-md': ['18px', { lineHeight: '24px' }],
        'text-lg': ['24px', { lineHeight: '32px' }],
        'text-xl': ['32px', { lineHeight: '40px' }]
      },
      colors: {
        brand: {
          primary: '#407F7F',
          'light-grey': '#E2E8F0',
          'mid-grey': '#666666',
          'dark-grey': '#39454E'
        },
        'nature-lab': {
          'dark-grey': '#151517',
          beige: '#F0EFE7'
        }
      },
      borderRadius: {
        project: '2px'
      }
    }
  },
  variants: {
    extend: {
      translate: ['responsive', 'hover', 'focus', 'active', 'group-hover']
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function ({ addComponents }: { addComponents: Function }) {
      const newUtilities = {
        '.transition-brand': {
          transition: 'all',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-in-out'
        }
      };
      addComponents(newUtilities);
    }
  ]
};
