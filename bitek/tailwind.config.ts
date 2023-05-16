import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "rotate-[1deg]",
    "rotate-[2deg]",
    "rotate-[3deg]",
    "rotate-[4deg]",
    "rotate-[5deg]",
    "rotate-[5deg]",
    "-rotate-[1deg]",
    "-rotate-[2deg]",
    "-rotate-[3deg]",
    "-rotate-[4deg]",
    "-rotate-[5deg]",
    "-rotate-[5deg]",
  ],
  theme: {
    extend: {
      fontFamily: {
        mitr: ['"Mitr"', "display"],
      },
      colors: {
        primary: {
          100: "#409028",
          75: "#70AC5E",
          50: "#9FC793",
          25: "#CFE3C9",
          bg: "#F8FBF7",
        },
      },
      boxShadow: {
        nav: "2px 2px 0px rgba(0, 0, 0, 1)",
      },
    },
    plugins: [],
  },
} satisfies Config;
