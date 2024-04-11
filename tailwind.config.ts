import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            desktop: '1400px',
        },
        fontSize: {
            13: '13px',
            15: '15px',
            16: '16px',
            18: '18px',
            23: '23px',
        },
        lineHeight: {
            18: '18px',
            20: '20px',
            22: '22px',
            24: '24px',
            31: '31px',
        },
        fontWeight: {
            400: '400',
            600: '600',
            700: '700',
        },
        colors: {
            purple: '#631ed3',
            'light-grey': '#dce0e4',
            'lighter-grey': '#f7f9fb',
            white: '#ffffff',
            black: '#353F48',
            dark: '#000000',
            aquamarine: '#00B1CB0F',
        },
        borderRadius: {
            2: '2px',
            4: '4px',
        },
        boxShadow: {
            standard: '0px 5px 20px 0px #2C30340F',
        },
        spacing: {
            0: '0',
            1: '1px',
            6: '6px',
            12: '12px',
            16: '16px',
            18: '18px',
            24: '24px',
            28: '28px',
            42: '42px',
            48: '48px',
            52: '52px',
            64: '64px',
            68: '68px',
            72: '72px',
            88: '88px',
        },
    },
    plugins: [],
};
export default config;
