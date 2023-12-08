/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './styles/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'color1': '#494036',
                'color2': ' #2f7a77',
                'color3': ' #251915',
                'color4': ' #fcffe0',
                'color5': ' #b1461b'
            },
        },
    },
    plugins: [],
};
