/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        errorAnimateDown: {
          "0%": { top: "-100px" },
          "100%": { top: "85px" },
        },
        errorAnimateUp: {
          "0%": { top: "85px" },
          "100%": { top: "-100px" },
        },
      },
      animation: {
        errorAnimateDown: "errorAnimateDown 1.25s ease-in-out forwards",
        errorAnimateUp: "errorAnimateUp 1.25s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
