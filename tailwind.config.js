/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shark: {
          50: '#f6f7f9',
          100: '#ebedf1',
          200: '#d0d6e1',
          300: '#a6b1c8',
          400: '#7588aa',
          500: '#526990',
          600: '#3f5175',
          700: '#33415e',
          800: '#2d374d',
          900: '#283040',
          950: '#1b202b',
        }
      }
    },
  },
  plugins: [],
}
