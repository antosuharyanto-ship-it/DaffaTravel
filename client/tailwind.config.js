/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F766E', // Deep Teal
                secondary: '#F59E0B', // Rich Gold/Amber
                accent: '#14B8A6', // Bright Teal
                background: '#F8FAFC', // Slate-50
                surface: '#FFFFFF',
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(15, 118, 110, 0.1)',
            }
        },
    },
    plugins: [],
}
