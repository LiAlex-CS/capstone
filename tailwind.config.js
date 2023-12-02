/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-dark": {
          100: "#262626",
          200: "#303030",
          300: "#3E3E3E",
          400: "#434343",
        },
        primary: {
          200: "#cccbc8",
          300: "#d9d8d4",
          400: "#e6e4e1",
          500: "#edece8",
        },
        "secondary-dark": {
          100: "#7ebde7",
          200: "#69b2e2",
          300: "#54a7de",
          400: "#3e9cda",
          500: "#2991d6",
          600: "#2583c1",
          700: "#2174ab",
          800: "#1d6696",
          900: "#185781",
          1000: "#14496c",
        },
        secondary: {
          100: "#78ebed",
          200: "#61e8ea",
          300: "#4ae5e8",
          400: "#34e2e5",
          500: "#1ddee2",
          600: "#1ac8cb",
          700: "#17b2b5",
          800: "#159c9e",
          900: "#128587",
          1000: "#0f6e70",
        },
        typography: "#292929",
        "typography-dark": "#e8e8e8",
      },
      fontFamily: {
        body: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
};
