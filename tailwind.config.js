/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-up": "url(/public/images/registretion bg image.png)",
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"]
      },
      colors: {
        "secoundaryText" : "#6c6c73",
        "primaryBorder" : "#cacad8",
        "primaryBgColor" : "#dddcea"
      },
      screens: {
        'sm': "576px",
        'md': "768px",
        'lg': "992px",
        'xl': "1200px",
        '2xl': "1400px"
      },
      aspectRatio: {
        '3/1.05': '3 / 1.05',
      }
    },
  },
  plugins: [],
};
