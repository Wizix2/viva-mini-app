import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VIVA brand colors
        "viva-yellow": "#F5D742",
        "viva-yellow-light": "#FFE98A",
        "viva-yellow-dark": "#C9A72A",
        "viva-bg": "#0E0E0F",
        "viva-surface": "rgba(255, 255, 255, 0.06)",
        "viva-glass": "rgba(255, 255, 255, 0.12)",
        "viva-border": "rgba(255, 255, 255, 0.18)",
        
        // Legacy colors - keeping for backward compatibility
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#9C4DFF", // Main accent color
          600: "#8B42E9",
          700: "#7C38D3",
          800: "#6D2EBD",
          900: "#5E24A7",
          950: "#4F1A91",
        },
        accent: {
          light: "#B86CFF", // Light accent for gradient end
          default: "#9C4DFF", // Default accent for gradient start
        },
        dark: {
          100: "#1A142B", // Card background
          200: "#14101F", // Slightly lighter than base
          300: "#0E0B19", // Base background
        },
        glass: {
          100: "rgba(255, 255, 255, 0.1)",
          200: "rgba(255, 255, 255, 0.05)",
          footer: "rgba(17, 13, 29, 0.9)",
        },
        yellow: {
          400: "#F5D742", // Main yellow accent
          500: "#E9C93A", // Darker yellow
          600: "#D4B52E", // Even darker yellow
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        
        // VIVA gradients
        "viva-gradient": "linear-gradient(to right, #F5D742, #FFE98A)",
        "viva-gradient-vertical": "linear-gradient(to bottom, #F5D742, #C9A72A)",
        "viva-glow": "radial-gradient(circle, rgba(245, 215, 66, 0.3) 0%, rgba(245, 215, 66, 0) 70%)",
        
        // Legacy gradients
        "gradient-purple": "linear-gradient(to right bottom, #9C4DFF, #B86CFF)",
        "gradient-button": "linear-gradient(to right, #9C4DFF, #B86CFF)",
        "gradient-hover": "linear-gradient(to right, #8B42E9, #A75BEF)",
        "gradient-active": "linear-gradient(to right, #7C38D3, #9A4FE3)",
        "shimmer": "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05) 60%, rgba(255, 255, 255, 0) 80%)",
        "glow-purple": "radial-gradient(circle, rgba(156, 77, 255, 0.3) 0%, rgba(156, 77, 255, 0) 70%)",
        "gradient-yellow": "linear-gradient(to right, #F5D742, #FFE17D)",
        "glow-yellow": "radial-gradient(circle, rgba(245, 215, 66, 0.3) 0%, rgba(245, 215, 66, 0) 70%)",
      },
      boxShadow: {
        // VIVA shadows
        'viva-glow': '0 0 15px rgba(245, 215, 66, 0.5)',
        'viva-glow-lg': '0 0 25px rgba(245, 215, 66, 0.6)',
        'viva-glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'viva-card': '0 4px 24px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
        
        // Legacy shadows
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'card': '0 0 20px rgba(150, 80, 255, 0.08)',
        'premium': '0 8px 32px rgba(156, 77, 255, 0.15)',
        'hover': '0 10px 40px rgba(156, 77, 255, 0.2)',
        'glow': '0 0 15px rgba(156, 77, 255, 0.5)',
        'glow-lg': '0 0 25px rgba(156, 77, 255, 0.6)',
        'inner-glow': 'inset 0 0 10px rgba(156, 77, 255, 0.3)',
        'yellow-glow': '0 0 15px rgba(245, 215, 66, 0.5)',
        'yellow-glow-lg': '0 0 25px rgba(245, 215, 66, 0.6)',
      },
      backdropBlur: {
        // VIVA blur levels
        'viva': '20px',
        'viva-heavy': '40px',
        
        // Legacy blur
        'glass': '10px',
        'footer': '16px',
        'xl': '20px',
        '2xl': '40px',
      },
      borderRadius: {
        // VIVA border radius
        'viva': '16px',
        'viva-lg': '24px',
        'viva-sm': '8px',
        
        // Legacy border radius
        'card': '18px',
        '2xl': '1rem',
      },
      fontSize: {
        // VIVA typography
        'title-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'title-lg': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        'title-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'title-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        fadeInUp: 'fadeInUp 0.4s ease-out',
        fadeInScale: 'fadeInScale 0.3s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;