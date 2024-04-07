import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontSize: {
            15: '15px',
        },
        fontFamily: {
            'open-sans': ['Open Sans', 'sans-serif'],
        },
        lineHeight: {
            20: '20px',
        },
        fontWeight: {
            700: '700',
            600: '600',
        },
        colors: {
            purple: '#631ed3',
            'light-grey': '#dce0e4',
            'lighter-grey': '#f7f9fb',
            white: '#ffffff',
            black: '#353F48',
        },
        borderRadius: {
            4: '4px',
        },
        spacing: {
            0: '0',
            1: '1px',
            12: '12px',
            24: '24px',
            28: '28px',
            42: '42px',
            48: '48px',
            64: '64px',
            68: '68px',
            88: '88px',
        },
    },
    plugins: [],
};
export default config;
