import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                shimmer: "shimmer 2s linear infinite",
            },
            keyframes: {
                shimmer: {
                    from: {
                        backgroundPosition: "0 0",
                    },
                    to: {
                        backgroundPosition: "-200% 0",
                    },
                },
            },
            colors: {
                primary: {
                    DEFAULT: '#e57373', // calm soft red (rose)
                    light: '#ffcdd2',   // pale background red
                    dark: '#c62828',    // deeper accent
                },
                secondary: {
                    DEFAULT: '#0288d1', // medical blue
                    light: '#4fc3f7',
                    dark: '#01579b',
                },
                accent: {
                    DEFAULT: '#26a69a', // teal for trust
                    light: '#80cbc4',
                    dark: '#00695c',
                },
                neutral: {
                    light: '#f9fafb',
                    DEFAULT: '#f3f4f6',
                    dark: '#e5e7eb',
                },
                warning: {
                    DEFAULT: '#fbc02d',
                },
                success: {
                    DEFAULT: '#2e7d32',
                }
            },
            fontSize: {
                xs: '0.875rem',   // 14px
                sm: '1rem',       // 16px
                base: '1.125rem', // 18px
                lg: '1.25rem',    // 20px
                xl: '1.5rem',     // 24px
                '2xl': '1.75rem', // 28px
                '3xl': '2rem',    // 32px
                '4xl': '2.5rem',  // 40px
                '5xl': '3rem',    // 48px
                '6xl': '3.75rem', // 60px
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
}
export default config
