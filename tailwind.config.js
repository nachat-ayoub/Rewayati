/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1C1C1C",
        darkBlue: "#0A2E33",
        darkGreen: "#12492F",
      },
      fontFamily: {
        cairo: ["cairo", "sans-serif"],
      },

      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "30%": { opacity: 1 },
          "100%": { opacity: 0, transform: "translateX(100%)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },

      animation: {
        slideIn: "slideIn 0.2s linear forwards",
        slideOut: "slideOut 0.2s linear forwards",
        fadeIn: "fadeIn 0.4s linear forwards",
        fadeOut: "fadeOut 0.1s linear forwards",
      },
    },
  },
  plugins: [],
};
