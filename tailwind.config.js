/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'logo': ['"Libre Barcode 39 Text"']
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
