/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD400',
        dark: '#121212',
        'dark-light': '#1E1E1E',
        'dark-lighter': '#2A2A2A',
      },
    },
  },
  plugins: [],
}
