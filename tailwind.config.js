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
          100: "#eaab7b",
          200: "#e79d65",
          300: "#e38f4f",
          400: "#e08138",
          500: "#dd7322",
          600: "#c7681f",
          700: "#b05c1c",
          800: "#9a5118",
          900: "#844515",
          1000: "#6e3a11",
        },
        secondary: {
          100: "#fdca9b",
          200: "#fdbd81",
          300: "#fdb068",
          400: "#fda34e",
          500: "#fd9635",
          600: "#fa881e",
          700: "#fa7b05",
          800: "#e16f05",
          900: "#c86304",
          1000: "#af5604",
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
