/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Caminhos para TODOS os arquivos que usam NativeWind
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          dark: "#5B21B6",
          light: "#A78BFA",
        },
        secondary: {
          DEFAULT: "#1F2937",
          dark: "#111827",
          light: "#374151",
        },
      },
    },
  },
  plugins: [],
};
