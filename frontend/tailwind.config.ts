import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#000000',
        accent: '#0A8DD0',
        'lighter-accent': '#90C2E7',
        'light-danger': '#ffcdd2',
        'gray-button': '#9EA49F',
        'light-gray': '#4E4F54',
        backgroundLight: '#EBEFFC',
        backgroundDark: '#3654A6',
        backgroundDarker: '#27355D',
        backgroundDarkest: '#050D26',
        whiteOpaque: '#ffffffb3',
      },
    },
  },
  plugins: [],
};
export default config;
