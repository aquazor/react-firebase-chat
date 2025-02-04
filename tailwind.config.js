/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: 'url("/bg.jpg")',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
