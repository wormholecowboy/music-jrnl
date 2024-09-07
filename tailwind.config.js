/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#494036",
        color2: "#C2C0A6",
        color3: "#251915",
        color4: "#fcffe0",
        color5: "#217373",
      },
    },
  },
  plugins: [],
  corePlugins: {},
};
