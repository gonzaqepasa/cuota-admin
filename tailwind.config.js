/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
    },

    minWidth: {
      '96': '24rem'
    },
    maxWidth: {
      "196": "46rem"
    }
  },
  plugins: [],
}
