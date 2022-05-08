module.exports = {
    purge: {
        enabled: true,
        content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
        options: {
            safelist: ['dark'], //specific classes
        },
    },
    theme: {
        typography: () => ({}),
        extend: {
            screens: {
                sm: '576px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                '2xl': '1400px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
    corePlugins: {
        preflight: true,
    },
}
