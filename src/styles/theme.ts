/**
 * VIVA AI Design System
 * 
 * This file contains all theme tokens and values for the VIVA AI application.
 * Use these values throughout the application to maintain consistent styling.
 */

export const VivaTheme = {
  colors: {
    // Brand colors
    yellow: {
      default: '#F5D742',
      light: '#FFE98A',
      dark: '#C9A72A',
    },
    
    // Background colors
    background: {
      base: '#0E0E0F',
      surface: 'rgba(255, 255, 255, 0.06)',
      card: 'rgba(255, 255, 255, 0.12)',
      elevated: 'rgba(255, 255, 255, 0.18)',
    },
    
    // Text colors
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
    
    // Border colors
    border: {
      default: 'rgba(255, 255, 255, 0.18)',
      light: 'rgba(255, 255, 255, 0.12)',
      subtle: 'rgba(255, 255, 255, 0.06)',
    },
    
    // Status colors
    status: {
      success: '#4CAF50',
      warning: '#F5D742',
      error: '#FF5252',
      info: '#2196F3',
    },
  },
  
  // Spacing scale (in pixels)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  // Border radius
  radius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    pill: '9999px',
  },
  
  // Typography
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizes: {
      'title-xl': '2.5rem',
      'title-lg': '2rem',
      'title-md': '1.5rem',
      'title-sm': '1.25rem',
      'body-lg': '1.125rem',
      'body-md': '1rem',
      'body-sm': '0.875rem',
      'body-xs': '0.75rem',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.14)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.16)',
    yellow: {
      sm: '0 0 8px rgba(245, 215, 66, 0.3)',
      md: '0 0 16px rgba(245, 215, 66, 0.4)',
      lg: '0 0 24px rgba(245, 215, 66, 0.5)',
    },
  },
  
  // Glass effect settings
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.12)',
      blur: '20px',
      border: 'rgba(255, 255, 255, 0.18)',
    },
    heavy: {
      background: 'rgba(255, 255, 255, 0.16)',
      blur: '40px',
      border: 'rgba(255, 255, 255, 0.24)',
    },
  },
  
  // Animation durations
  animation: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

/**
 * Helper functions for using theme values
 */

export const rgba = (hex: string, alpha: number): string => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Return rgba string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getCssVar = (name: string): string => {
  return `var(--${name})`;
};

export default VivaTheme;
