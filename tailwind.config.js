/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#414BEA",
        secondary: "#7752FE",
        accent: "#F05537",
        light: "#F6F5F5",
        textPrimary: "#222222",
        textSecondary: "#3D3B40",
        highlight: "#D9E2FF",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        secondary: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
