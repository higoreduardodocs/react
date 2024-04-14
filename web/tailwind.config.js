/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        header: '#292841',
        primary: '#423F71',
        body: '#1C1B29',
      },
      screens: {
        mobile: { max: '768px' },
      },
    },
  },
  plugins: [],
}
