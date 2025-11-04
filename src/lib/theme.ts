// Theme Configuration - Centralized design system
export const theme = {
  // Color Palette
  colors: {
    // Primary Colors
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#0f766e',
      700: '#0a5350',
      800: '#0a3f3d',
      900: '#092f2d',
      950: '#041613',
    },
    // Secondary Colors (mirrors primary for monochrome palette)
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#0f766e',
      700: '#0a5350',
      800: '#0a3f3d',
      900: '#092f2d',
      950: '#041613',
    },
    // Neutral Colors
    gray: {
      50: '#f4faf9',
      100: '#e8f4f2',
      200: '#d2e7e4',
      300: '#b7d6d3',
      400: '#91bdb8',
      500: '#6aa39d',
      600: '#4c857f',
      700: '#366462',
      800: '#244846',
      900: '#162f2e',
      950: '#0b1b1b',
    },
    // Semantic Colors
    success: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#0f766e',
    },
    warning: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#0f766e',
    },
    error: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#0f766e',
    },
    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f4fbf8',
      tertiary: '#e9f4f1',
      dark: '#092f2d',
    },
    // Text Colors
    text: {
      primary: '#092f2d',
      secondary: '#0f4b44',
      tertiary: '#166154',
      inverse: '#ffffff',
      muted: '#4c857f',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Scheherazade New', 'serif'],
      sansEnglish: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      sansPashto: ['Scheherazade New', 'serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
      arabic: ['Noto Naskh Arabic', 'serif'],
    },
    fontSize: {
      xs: ['0.875rem', { lineHeight: '1.25rem' }],
      sm: ['0.9375rem', { lineHeight: '1.375rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.875rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1.2' }],
      '6xl': ['3.75rem', { lineHeight: '1.2' }],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
    slower: '500ms ease-in-out',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

// Theme utility functions
export const getThemeColor = (colorPath: string) => {
  const path = colorPath.split('.');
  let value: any = theme.colors;
  
  for (const key of path) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color path "${colorPath}" not found in theme`);
      return theme.colors.gray[500];
    }
  }
  
  return value;
};

export const getThemeSpacing = (size: keyof typeof theme.spacing) => {
  return theme.spacing[size];
};

export const getThemeShadow = (size: keyof typeof theme.shadows) => {
  return theme.shadows[size];
};

// CSS Variables for theme
export const cssVariables = {
  '--color-primary-50': theme.colors.primary[50],
  '--color-primary-100': theme.colors.primary[100],
  '--color-primary-200': theme.colors.primary[200],
  '--color-primary-300': theme.colors.primary[300],
  '--color-primary-400': theme.colors.primary[400],
  '--color-primary-500': theme.colors.primary[500],
  '--color-primary-600': theme.colors.primary[600],
  '--color-primary-700': theme.colors.primary[700],
  '--color-primary-800': theme.colors.primary[800],
  '--color-primary-900': theme.colors.primary[900],
  '--color-primary-950': theme.colors.primary[950],
  '--color-secondary-50': theme.colors.secondary[50],
  '--color-secondary-500': theme.colors.secondary[500],
  '--color-secondary-600': theme.colors.secondary[600],
  '--color-gray-50': theme.colors.gray[50],
  '--color-gray-100': theme.colors.gray[100],
  '--color-gray-200': theme.colors.gray[200],
  '--color-gray-300': theme.colors.gray[300],
  '--color-gray-400': theme.colors.gray[400],
  '--color-gray-500': theme.colors.gray[500],
  '--color-gray-600': theme.colors.gray[600],
  '--color-gray-700': theme.colors.gray[700],
  '--color-gray-800': theme.colors.gray[800],
  '--color-gray-900': theme.colors.gray[900],
  '--color-gray-950': theme.colors.gray[950],
  '--color-success-50': theme.colors.success[50],
  '--color-success-500': theme.colors.success[500],
  '--color-success-600': theme.colors.success[600],
  '--color-warning-50': theme.colors.warning[50],
  '--color-warning-500': theme.colors.warning[500],
  '--color-warning-600': theme.colors.warning[600],
  '--color-error-50': theme.colors.error[50],
  '--color-error-500': theme.colors.error[500],
  '--color-error-600': theme.colors.error[600],
  '--color-background-primary': theme.colors.background.primary,
  '--color-background-secondary': theme.colors.background.secondary,
  '--color-background-tertiary': theme.colors.background.tertiary,
  '--color-background-dark': theme.colors.background.dark,
  '--color-text-primary': theme.colors.text.primary,
  '--color-text-secondary': theme.colors.text.secondary,
  '--color-text-tertiary': theme.colors.text.tertiary,
  '--color-text-inverse': theme.colors.text.inverse,
  '--color-text-muted': theme.colors.text.muted,
} as const;
