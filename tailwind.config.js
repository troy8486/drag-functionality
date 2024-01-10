/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      colors: {
        'custom-blue' : '#003049',
        'custom-background' : '#eae2b7 ',
        'custom-screen' : '#f77f00',
        'custom-card' : '#fcbf49'
      }
    },
  },
  plugins: [],
}

