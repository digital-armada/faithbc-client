import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                fbc: {
                    light: '#3fbaeb',
                    default: '#0fa9e6',
                    dark: '#0c87b8',
                },
            },
            fontFamily: {
                display: ['var(--font-lora)'],
                body: ['var(--font-roboto)'],
            },
            backgroundImage: {
                'grainy-pattern': "url('/noise.png')", // or any desired repeat value
            },
        },
    },
    plugins: [],
};
export default config;
