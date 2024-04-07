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
        },
        colors: {
            purple: '#631ed3',
            'light-grey': '#dce0e4',
            white: '#ffffff',
        },
        borderRadius: {
            4: '4px',
        },
        spacing: {
            1: '1px',
            12: '12px',
            28: '28px',
            42: '42px',
            64: '64px',
            88: '88px',
        },
    },
    plugins: [],
};
export default config;
