/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Signika: "'Signika', sans-serif",
        Teko: "'Teko', sans-serif",
        Righteous: "'Righteous', cursive;",
      },
    },
  },
  plugins: [],
}
