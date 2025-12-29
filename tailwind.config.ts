import type { Config } from "tailwindcss";
import { colors } from "./app/constants/colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        iransans: ["var(--font-iransans)"],
      },
      boxShadow: {
        'core': "rgba(0, 0, 0, 0.15) 0px 0px 16px -4px",
        'top': '0px -5px 26px 0px rgba(0,0,0,0.1), 0px 10px 10px -3px rgba(0,0,0,0.1)',
      },
      zIndex: {
        1000: "1000"
      },
      aspectRatio: {
        "7/6": "7/6",
        "4/3": "4/3",
        "3/4": "3/4",
        "5/4": "5/4",
      }
    },
  },
  plugins: [],
} satisfies Config;
