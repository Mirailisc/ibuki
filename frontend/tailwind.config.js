/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      mono: ['JetBrains Mono'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        background: '#1c1c1c',
        primary: {
          50: '#fef9ee',
          100: '#fef2d6',
          200: '#fce1ac',
          300: '#f9cb78',
          400: '#f7b65c',
          500: '#f3901c',
          600: '#e47512',
          700: '#bd5911',
          800: '#964716',
          900: '#793b15',
          950: '#411c09',
        },
      },
    },
  },
  plugins: [],
}
