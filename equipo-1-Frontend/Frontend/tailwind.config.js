/** @type {import('tailwindcss').Config} */
import theme from "./src/utils/tailwind/theme"

// Comando para generar el dist de tailwind
// npx tailwindcss -i ./src/utils/tailwind/input.css -o ./dist/output.css --watch

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: theme,
  },
  plugins: [],
}

