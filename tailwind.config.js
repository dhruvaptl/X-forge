/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f6f6f4',
          100: '#e9e8e3',
          200: '#d4d2c9',
          300: '#a8a59a',
          400: '#7a786e',
          500: '#52514a',
          600: '#3a3a35',
          700: '#2a2a26',
          800: '#1c1c19',
          900: '#121211',
          950: '#080807',
        },
      },
    },
  },
  plugins: [],
}
