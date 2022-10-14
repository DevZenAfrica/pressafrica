/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          50: '#e2f7fe',
          100: '#b5e9fd',
          200: '#85dafc',
          300: '#55cbfa',
          400: '#32c0fa',
          500: '#13b4f9',
          600: '#0ea6ea',
          700: '#0692d7',
          800: '#0681c3',
          900: '#0061A1',
        },
        'orange': {
          50:  '#fef9e3',
          100: '#feedb9',
          200: '#fee28c',
          300: '#fed860',
          400: '#fdce43',
          500: '#fdc636',
          600: '#fcb831',
          700: '#fba62d',
          800: '#fa972a',
          900: '#f77a25',
        },
      },
    },
  },
  plugins: [],
}
