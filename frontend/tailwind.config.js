/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#1c324a', 
        'secondary-gray': '#e5e7eb', 
        'accent-teal': '#06b6d4',
      }
    },
  },
  plugins: [],
}