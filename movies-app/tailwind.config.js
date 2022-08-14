/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        baseColor:'#F32424',
        background:'#2C3639'
      },
      fontFamily:{
        Signika: "'Signika', sans-serif",
        Teko: "'Teko', sans-serif",
        Righteous: "'Righteous', cursive;",
      },
    },
  },
  plugins: [],
}
