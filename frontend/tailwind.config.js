/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: "border 1s ease",
      },
      keyframes: {
        border: {
          "0%": { border: "2px solid white" },
          "100%": { border: "2px solid blue" },
        },
      },
    },
  },
  plugins: [],
};