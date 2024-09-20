/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#071C39",
        color2: "#41526c",
        color3: "#2b3447",
        color4: "#fcffe0",
        color5: "#059185",
      },
    },
  },
  plugins: [],
  corePlugins: {},
};
