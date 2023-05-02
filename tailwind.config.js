module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      mono: ["Lucida Console", "Courier", "monospace"],
      cast: ["CastIron-Black", "sans-serif"],
      max: [""],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        black: "#11052C",
        white: "#f4f5f5",
        maroon: "#501B1B",
        orange: "#854E2A",
        slate: "#32342E",
        creme: "#ECE3CE",
        "washed-creme": "#EEE8D8",
        "dark-creme": "#E5CFA8",
        olive: "#878D75",
        "example-color": {
          light: "#ffb288",
          DEFAULT: "#d18d67",
          dark: "#ce8860",
        },
      },
    },
  },
  plugins: [],
};
