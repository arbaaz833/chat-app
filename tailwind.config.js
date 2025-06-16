/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#A48DB8",
        "primary-200": "#957AAC",
        "primary-300": "#8567A0",
        "primary-400": "#765494",
        "primary-500": "#674188",
        "primary-600": "#5D3B7A",
        "primary-700": "#52346D",
        "primary-800": "#482E5F",
        "primary-900": "#3E2752",
        text: "#333",
        background: "#d9d9d9",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
