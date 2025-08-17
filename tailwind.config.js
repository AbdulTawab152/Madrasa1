const { theme } = require('./src/lib/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        gray: theme.colors.gray,
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        background: theme.colors.background,
        text: theme.colors.text,
      },
      fontFamily: {
        sans: theme.typography.fontFamily.sans,
        serif: theme.typography.fontFamily.serif,
        mono: theme.typography.fontFamily.mono,
        arabic: theme.typography.fontFamily.arabic,
      },
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      zIndex: theme.zIndex,
      screens: {
        'xs': '475px',
        ...theme.breakpoints,
      },
    },
  },
  plugins: [
    // Custom plugin for theme utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(to right, var(--color-primary-600), var(--color-secondary-600))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-gradient-primary': {
          background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
        },
        '.bg-gradient-secondary': {
          background: 'linear-gradient(135deg, var(--color-secondary-500), var(--color-secondary-700))',
        },
        '.shadow-soft': {
          boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        },
        '.shadow-medium': {
          boxShadow: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        '.shadow-strong': {
          boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};