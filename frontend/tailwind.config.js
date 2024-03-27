/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {},
      colors: {
        companyColor: "#ffc020",
        primaryColor: "#1a2b6d",
        footer: "#1d202c",
        inputColor: "#F8F8F8",
        bodyColor: "#e2e8f0",
        footerLinks: "#a6aab6",
        scrollToTop: "#e7473c",
        trackColor: "#002147",
        colorOne: "#ff3259",
        colorTwo: "#070346",
        colorThree: "#0b3052",
        colorFour: "#06adef",
      },
    },
  },
  plugins: [],
};
