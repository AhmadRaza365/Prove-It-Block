/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#DC6C9C",
        "secondary": "#55B9C7",
        "dark-blue": "#23477E",
      },
    },
  },
  plugins: [],
})