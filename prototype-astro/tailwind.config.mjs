/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        night: '#0a0a0f',
        'night-light': '#14141f',
        scroll: '#f2e8d5',
        'scroll-light': '#f7f0e3',
        'scroll-dark': '#e6d5b8',
        ink: '#2c2418',
        'ink-light': '#6b5d4d',
        'ink-faint': '#9e8e7a',
        vermillion: '#bf3b2c',
        gold: '#a67c3d',
        'gold-light': '#c9a86c',
        jade: '#3a6b5e',
      },
      fontFamily: {
        heading: ['"Zhi Mang Xing"', '"Ma Shan Zheng"', '"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        display: ['"Ma Shan Zheng"', '"Zhi Mang Xing"', '"Noto Serif SC"', 'serif'],
        body: ['"Noto Serif SC"', '"Source Han Serif SC"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
