/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      maxWidth: {
        custom: '90rem',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('tailwind-scrollbar')],
};
