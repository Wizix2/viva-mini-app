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
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#9C4DFF", // Updated to match Fotolab.ai
          600: "#8B42E9", // Adjusted
          700: "#7C38D3", // Adjusted
          800: "#6D2EBD", // Adjusted
          900: "#5E24A7", // Adjusted
          950: "#4F1A91", // Adjusted
        },
        accent: {
          light: "#B86CFF", // Light accent for gradient
          default: "#9C4DFF", // Default accent
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
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-purple": "linear-gradient(to right bottom, #9C4DFF, #B86CFF)", // Updated to match Fotolab.ai
        "gradient-button": "linear-gradient(to right, #9C4DFF, #B86CFF)", // For buttons
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'card': '0 0 20px rgba(150, 80, 255, 0.08)',
        'premium': '0 8px 32px rgba(156, 77, 255, 0.15)',
      },
      backdropBlur: {
        'glass': '10px',
        'footer': '16px',
      },
      borderRadius: {
        'card': '18px',
      }
    },
  },
  plugins: [],
};
export default config;
