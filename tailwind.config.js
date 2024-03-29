/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            serif: ['Manrope', 'sans-serif'],
        },
        extend: {
            height: {
                'header-height': 'var(--header-height)',
            },
            animation: {
                'fade-out': 'fadeOut 2s ease-in-out',
            },
        },
        screens: {
            sm: '480px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1300px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
};
