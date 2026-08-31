/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayush: {
          green: '#2C5F2D',
          'green-light': '#97BC62',
          'green-dark': '#1E431F',
          'green-soft': '#EAF2EB',
          terracotta: '#C45A1F',
          'terracotta-light': '#E27D44',
          'terracotta-dark': '#9A4011',
          'terracotta-soft': '#FDF1EB',
          saffron: '#E87A1E',
          cream: '#FBFBF7',
          gold: '#D4AF37',
          herbal: '#3A7D44',
          earth: '#694829'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
