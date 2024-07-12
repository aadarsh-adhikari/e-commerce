/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-medium': 'spin 2s linear infinite', // Custom medium spin animation
      },
    },
    },
  plugins: [],
}