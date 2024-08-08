/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLightBlue: "#D4D6F6",
         bgDarkBlue: "#c1c5f2",
         btnDark: '#3442d9'
      }
    },
  },
  plugins: [],
}

