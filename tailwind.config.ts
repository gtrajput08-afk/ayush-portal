import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayush: {
          green: "#2C5F2D",
          "green-dark": "#1C3F1E",
          "green-light": "#E9F2E9",
          "green-border": "#A4C3A2",
          orange: "#C45A1F",
          "orange-dark": "#9A4315",
          "orange-light": "#FDF2EC",
          "orange-border": "#E5A885",
          sand: "#F7F5F0",
          cream: "#FCFAF6",
          dark: "#1A251B",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
