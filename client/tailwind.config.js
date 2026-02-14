/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F766E', // Teal-700
                secondary: '#F59E0B', // Amber-500
                accent: '#14B8A6', // Teal-500
                background: '#F0FDF4', // Green-50
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
