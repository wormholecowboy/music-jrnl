/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#251915",
        color2: "#494036",
        color3: "#251915",
        color4: "#fcffe0",
        color5: "#217373",
      },
    },
  },
  plugins: [],
  corePlugins: {},
};
