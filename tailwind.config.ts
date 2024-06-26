/* eslint-disable import/no-extraneous-dependencies */

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'aspect-w-16',
    'aspect-h-9',
    'aspect-w-4',
    'aspect-h-3',
    'aspect-w-[21]',
    'aspect-h-9',
    'aspect-w-9',
    'aspect-h-16',
    'aspect-w-3',
    'aspect-h-4',
    'lg:aspect-w-16',
    'lg:aspect-h-9',
    'lg:aspect-w-4',
    'lg:aspect-h-3',
    'lg:aspect-w-[21]',
    'lg:aspect-h-9',
    'lg:aspect-w-9',
    'lg:aspect-h-16',
    'lg:aspect-w-3',
    'lg:aspect-h-4'
  ],
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
      sans: ['var(--font-sans)'],
      serif: ['var(--font-iowan)'],
      mono: ['var(--font-mono)'],
      'nature-lab-body': ['var(--font-nature-lab-body)'],
      'nature-lab-heading': ['var(--font-nature-lab-heading)']
    },
    fontSize: {
      'heading-2xs': ['16px', { lineHeight: '20px' }],
      'heading-xs': ['20px', { lineHeight: '28px' }],
      'heading-sm': ['28px', { lineHeight: '32px' }],
      'heading-md': ['32px', { lineHeight: '40px' }],
      'heading-lg': ['40px', { lineHeight: '48px' }],
      'heading-xl': ['60px', { lineHeight: '64px' }],
      'heading-2xl': ['80px', { lineHeight: '80px' }],
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      md: ['18px', '24px'],
      lg: ['24px', '32px'],
      xl: ['32px', { lineHeight: '40px' }],
      'nature-lab-sm': ['12px', { lineHeight: '18px' }],
      'nature-lab-md': ['14px', { lineHeight: '18px' }],
      'nature-lab-lg': ['18px', { lineHeight: '24px' }],
      'nature-lab-heading-sm': ['20px', { lineHeight: '40px', letterSpacing: '0.4px' }],
      'nature-lab-heading-lg': ['32px', { lineHeight: '36px', letterSpacing: '0.4px' }],
      'nature-lab-heading-xl': ['40px', { lineHeight: '48px', letterSpacing: '0.4px' }],
      'overline-sm': ['10px', { lineHeight: '10px', letterSpacing: '0.4px' }],
      'overline-md': ['14px', { lineHeight: '14px', letterSpacing: '0.4px' }]
    },
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      },
      blink: {
        '0%': { opacity: 0.2 },
        '20%': { opacity: 1 },
        '100% ': { opacity: 0.2 }
      },
      'hotspot-blink': {
        '0%, 100%': { opacity: 0.2, transform: 'scale(2)' },
        '50%': { opacity: 1 }
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
      'drawer-top-show': {
        from: { transform: 'translateY(-100%)' },
        to: { transform: 'translateY(0)' }
      },
      'drawer-top-hide': {
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(-100%)' }
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
        to: { height: 'auto' }
      },
      'menu-slide-up': {
        from: { height: 100 },
        to: { height: 'auto' }
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
      spin: 'spin 0.4s linear infinite',
      blink: 'blink 1.4s var(--animation-delay, 0ms) both infinite',
      'hotspot-blink': 'hotspot-blink 2.5 cubic-bezier(0, 0, 0.2, 1) infinite',
      'fade-in-text':
        'fade-in-text var(--duration, 500ms) var(--animation-delay, 0ms) ease-out forwards',
      'fade-up-text': 'fade-up-text 500ms var(--animation-delay, 0ms) ease-out forwards',
      'modal-show': 'fade-in 300ms var(--ease-out-quad) forwards',
      'modal-hide': 'fade-out 300ms var(--ease-out-quad) forwards',
      'drawer-right-show': 'drawer-right-show 400ms var(--ease-out-quad)',
      'drawer-right-hide': 'drawer-right-hide 400ms var(--ease-out-quad)',
      'drawer-left-show': 'drawer-left-show 500ms var(--ease-out-expo)',
      'drawer-left-hide': 'drawer-left-hide 500ms var(--ease-out-expo)',
      'drawer-bottom-show': 'drawer-bottom-show 400ms var(--ease-out-quad)',
      'drawer-bottom-hide': 'drawer-bottom-hide 400ms var(--ease-out-quad)',
      'drawer-top-show': 'drawer-top-show 400ms var(--ease-out-quad)',
      'drawer-top-hide': 'drawer-top-hide 400ms var(--ease-out-quad)',
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
      minHeight: {
        screenHeightWithoutHeader: 'calc(100vh - 101px)'
      },
      height: {
        screenHeightWithoutHeader: 'calc(100vh - 101px)'
      },
      ringColor: {
        DEFAULT: '#407F7F'
      },
      colors: {
        brand: {
          primary: '#407F7F',
          'primary-light': '#CCE5E5',
          'light-grey': '#E2E8F0',
          'mid-grey': '#666666',
          'dark-grey': '#39454E',
          beige: '#FDF5E6',
          sand: '#F5F5F4'
        },
        'nature-lab': {
          'dark-grey': '#151517',
          beige: '#F0EFE7'
        }
      },
      borderRadius: {
        project: '2px'
      },
      backdropBlur: {
        brand: '16px'
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
