/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'sidebarbox': '0 8px 30px -5px #804fb3',
        'sidebarbox2': '0 15px 30px -1px #ccb7e5',
        'cardShadow': '10px 15px 25px -5px #e6d1f2'
      },
      colors: {
        'light-purple': '#e6d1f2',
        'mid-purple': '#ccb7e5',
        'dark-purple': '#804fb3',
      },
      animation: {
        border: "border 1s ease",
      },

      keyframes: {
        border: {
          "0%": { border: "2px solid white" },
          "100%": { border: "2px solid #804fb3" },
        },
      },
    },
  },
  plugins: [],
};