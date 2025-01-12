/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a237e',
          light: '#534bae',
          dark: '#000051',
        }
      }
    },
  },
  plugins: [],
};