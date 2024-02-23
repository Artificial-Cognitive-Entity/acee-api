import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {animation: {
      'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }},
  },
  daisyui: {
    themeRoot: ":root",
    themes: ["business", "wireframe", "cmyk", "retro","light","dark"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
});
export default config;
