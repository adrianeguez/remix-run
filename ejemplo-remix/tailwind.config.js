/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');
module.exports = konstaConfig({
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
        extend: {},
    },
    plugins: [],
});
