/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ← 이 경로가 틀리면 CSS 0%
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}